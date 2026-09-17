import React, { useState } from "react";
import { getYouTubeThumbnail, getYouTubeEmbedUrl, getYouTubeWatchUrl } from "../utility/youtube";

// Small card: shows the YouTube thumbnail with a play button on top; on
// click it swaps in a real embedded YouTube player that starts playing
// right there in the card. A "Watch on YouTube" pill in the corner always
// links straight to the real YouTube page, in a new tab, regardless of
// whether the card is currently playing or not.
export default function YouTubeVideoCard({ videoId, className = "" }) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl group bg-black transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="relative w-full h-[300px]">
        {playing ? (
          <iframe
            src={`${getYouTubeEmbedUrl(videoId)}?autoplay=1&rel=0`}
            title="YouTube video player"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            frameBorder="0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play video"
            className="absolute inset-0 w-full h-full cursor-pointer"
          >
            <img
              src={getYouTubeThumbnail(videoId)}
              alt="Video thumbnail"
              loading="lazy"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "inset 0 0 0 2px rgba(200,164,93,0.7)" }} />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-600 translate-x-[1.5px]" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      <a
        href={getYouTubeWatchUrl(videoId)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#C8A45D] hover:text-black hover:border-[#C8A45D] transition-all duration-300"
      >
        ▶ Watch on YouTube
      </a>
    </div>
  );
}
