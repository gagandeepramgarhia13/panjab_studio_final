-- ===========================================================================
-- PANJAB STUDIOS — TESTIMONIALS: APPROVE + PUBLISH UPGRADE
-- ---------------------------------------------------------------------------
-- Run this AFTER testimonials_setup.sql (the one you already ran).
-- Supabase → SQL Editor → New query → paste this whole file → Run.
--
-- What this adds (matching the Kohinoor Transport pattern you asked for):
--   * A separate `published` step, so "Approve" (confirms it's a real
--     customer) and "Publish" (put it live on the website) are two
--     deliberate actions instead of one. A testimonial can never be
--     published unless it is approved first — the database enforces this.
--   * The public site (Home page + Testimonials page) now only ever shows
--     testimonials that are BOTH approved AND published.
--
-- Safe to run more than once.
-- ===========================================================================

-- 1. Add the `published` column if it isn't there yet.
alter table public.testimonials
  add column if not exists published boolean not null default false;

-- 2. Anything already approved under the old single-step flow gets published
--    automatically, so nothing you already approved disappears from the site.
update public.testimonials
  set published = true
  where status = 'approved' and published = false;

-- 3. Belt and braces: a testimonial can only be published while approved.
--    Rejecting/resetting a live testimonial takes it off the site automatically.
create or replace function public.enforce_testimonial_publish_rules()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'approved' then
    return new;
  end if;

  if tg_op = 'UPDATE' and old.status is distinct from new.status then
    new.published := false;
    return new;
  end if;

  if new.published = true then
    raise exception 'A testimonial can only be published while its status is ''approved''.';
  end if;

  new.published := false;
  return new;
end;
$$;

drop trigger if exists testimonials_publish_rules on public.testimonials;
create trigger testimonials_publish_rules
  before insert or update on public.testimonials
  for each row execute function public.enforce_testimonial_publish_rules();

-- 4. Public visitors may only ever read testimonials that are BOTH approved
--    and published — replaces the old "status = 'approved'" only check.
drop policy if exists "Public can view approved testimonials" on public.testimonials;
drop policy if exists "testimonials: public read approved" on public.testimonials;

create policy "testimonials: public read approved and published"
  on public.testimonials for select
  to anon
  using (status = 'approved' and published = true);

-- ===========================================================================
-- VERIFY
-- ---------------------------------------------------------------------------
--   select id, name, status, published from public.testimonials order by created_at desc;
-- ===========================================================================
