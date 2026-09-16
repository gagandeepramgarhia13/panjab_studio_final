import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase, BUCKETS } from "../supabase";
import SectionGlow from "./SectionGlow";

export default function OurTeam({ fullPage = false }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase.storage
        .from(BUCKETS.team)
        .list("", { limit: 20, sortBy: { column: "created_at", order: "asc" } });

      if (!error && data) {
        const items = data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => {
            const { data: urlData } = supabase.storage
              .from(BUCKETS.team)
              .getPublicUrl(f.name);
            return { url: urlData.publicUrl };
          });
        setMembers(items);
      }
      setLoading(false);
    }
    fetchTeam();
  }, []);

  const grid = (
    <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
      {members.map((member, index) => (
        <div
          key={index}
          className="group cursor-pointer"
          style={{
            opacity: 0,
            animation: `fadeSlideUp 0.6s ease forwards ${index * 100}ms`,
          }}
          onClick={() => setSelected(member.url)}
        >
          {/* Photo only — no name */}
          <div
            className="relative w-full aspect-square overflow-hidden rounded-2xl"
            style={{
              boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,164,93,0.1)",
            }}
          >
            <img
              src={member.url}
              alt="Team member"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* Gold border on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ boxShadow: "inset 0 0 0 1.5px rgba(200,164,93,0.6)" }}
            />

            {/* Zoom icon hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Lightbox
  const lightbox = selected && (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
      onClick={() => setSelected(null)}
    >
      <div
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelected(null)}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#C8A45D] hover:text-black hover:border-[#C8A45D] transition-all duration-300"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <img
          src={selected}
          alt="Team member"
          className="w-full max-h-[80vh] object-contain rounded-2xl"
          style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,164,93,0.15)" }}
        />
      </div>
    </div>
  );

  // ── Home section version ──────────────────────────────────────────────────
  if (!fullPage) {
    if (loading) return (
      <section className="w-full py-20 bg-[var(--background)] flex justify-center">
        <div className="w-10 h-10 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
      </section>
    );
    if (members.length === 0) return null;

    return (
      <section className="relative w-full bg-[var(--background)] py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
        <SectionGlow variant="dark" />
        <div className="relative z-10 text-center mb-12 sm:mb-16">
          <span className="text-[#C8A45D] text-xs tracking-[5px] uppercase font-medium">
            The People Behind The Lens
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mt-3"
            style={{ textShadow: "0 0 40px rgba(200,164,93,0.15)" }}
          >
            Meet Our Team
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A45D]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A45D]/40" />
          </div>
        </div>

        <div className="relative z-10">{grid}</div>
        {lightbox}

        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    );
  }

  // ── Full page version ─────────────────────────────────────────────────────
  return (
    <section className="w-full min-h-screen bg-[var(--background)] flex flex-col">

      {/* Hero */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] flex justify-center items-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0a0a0a]" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(200,164,93,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center space-y-4">
          <span className="text-[#C8A45D] text-xs tracking-[5px] uppercase font-medium">
            The People Behind The Lens
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white"
            style={{ textShadow: "0 0 60px rgba(200,164,93,0.2)" }}
          >
            Meet Our Team
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A45D]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A45D]/40" />
          </div>
          <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Passionate professionals dedicated to capturing your most precious moments.
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="relative flex-1 px-4 sm:px-6 pb-16 sm:pb-24 overflow-hidden">
        <SectionGlow variant="dark" />
        {loading ? (
          <div className="relative z-10 flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="relative z-10 text-center py-24 text-white/30">
            <p className="text-lg">No team members added yet.</p>
            <p className="text-sm mt-2">
              Visit <span className="text-[#C8A45D]">/admin</span> → Photography → 👥 Team Members to upload.
            </p>
          </div>
        ) : <div className="relative z-10">{grid}</div>}
      </div>

      {lightbox}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}