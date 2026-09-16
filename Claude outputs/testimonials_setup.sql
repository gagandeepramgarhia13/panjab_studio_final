-- Run this once in Supabase Dashboard → SQL Editor → New query → Run

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  rating smallint not null default 5,
  message text not null,
  status text not null default 'pending', -- pending | approved | rejected
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

-- Anyone visiting the site can submit a testimonial
create policy "Public can submit testimonials"
  on public.testimonials for insert
  to anon
  with check (true);

-- The public Testimonials page only ever sees approved ones
create policy "Public can view approved testimonials"
  on public.testimonials for select
  to anon
  using (status = 'approved');

-- Logged-in admin (via /admin/login) can see, update and delete everything
create policy "Admins can view all testimonials"
  on public.testimonials for select
  to authenticated
  using (true);

create policy "Admins can update testimonials"
  on public.testimonials for update
  to authenticated
  using (true);

create policy "Admins can delete testimonials"
  on public.testimonials for delete
  to authenticated
  using (true);
