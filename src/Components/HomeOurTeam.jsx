import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, BUCKETS } from "../supabase";
import SectionGlow from "./SectionGlow";
import TiltCard from "./TiltCard";

export default function HomeOurTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase.storage
        .from(BUCKETS.team)
        .list("", { limit: 4, sortBy: { column: "created_at", order: "asc" } });

      if (!error && data) {
        const items = data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .slice(0, 4)
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

  if (loading || members.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--surface)] py-14 sm:py-16 md:py-20 px-4 sm:px-6">
      <SectionGlow variant="dark" />
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Top row — heading + button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs tracking-[4px] uppercase text-[#C8A45D]/70 font-medium">
              The People Behind The Lens
            </span>
            <h2 className="text-3d-gold text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-1 leading-tight">
              Meet Our Team
            </h2>
          </div>

          <button
            onClick={() => navigate("/team")}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8A45D] text-black text-sm font-medium rounded-full hover:bg-white transition-all duration-300 flex-shrink-0 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-8px_rgba(200,164,93,0.5)]"
          >
            View Full Team →
          </button>
        </div>

        {/* Photos grid — max 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 tilt-perspective">
          {members.map((member, index) => (
            <TiltCard
              key={index}
              max={7}
              onClick={() => navigate("/team")}
              className="group aspect-square overflow-hidden rounded-2xl cursor-pointer hover:-translate-y-2"
              style={{
                opacity: 0,
                animation: `fadeSlideUp 0.5s ease forwards ${index * 80}ms`,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
            >
              <img
                src={member.url}
                alt="Team member"
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Gold border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 0 2px rgba(200,164,93,0.7)" }}
              />
            </TiltCard>
          ))}
        </div>

      </div>

      <style>{`
        /* Only animates opacity (not transform) so it never fights with the
           hover:-translate-y-2 lift above once the entrance animation ends. */
        @keyframes fadeSlideUp {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}