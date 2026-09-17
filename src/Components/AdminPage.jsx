import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ImageIcon, Video, Trash2, LogOut,
  Menu, X, Eye, CheckCircle, AlertCircle, FolderOpen,
  Film, Camera, ChevronRight, CloudUpload, Mail, MailOpen, Phone, User,
  ChevronDown, Star, ThumbsUp, ThumbsDown, RotateCcw,
} from "lucide-react";
import { supabase, BUCKETS, YOUTUBE_TABLE } from "../supabase";
import { getYouTubeId, getYouTubeThumbnail, getYouTubeWatchUrl } from "../utility/youtube";
import { Link2, Youtube } from "lucide-react";

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl backdrop-blur-xl border
          ${t.type === "success" ? "bg-[#C8A45D]/90 text-black border-[#C8A45D]/50" : "bg-red-500/90 text-white border-red-400/50"}`}>
          {t.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ── Drop Zone ────────────────────────────────────────────────────────────────
function DropZone({ accept, label, icon: Icon, onFiles, uploading }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();
  const handle = (files) => { if (files?.length) onFiles(Array.from(files)); };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files); }}
      onClick={() => !uploading && inputRef.current.click()}
      className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed
        rounded-2xl p-10 transition-all duration-300 backdrop-blur-xl
        ${uploading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${dragging ? "border-[#C8A45D] bg-[#C8A45D]/10 scale-[1.01]"
          : "border-white/20 bg-white/5 hover:border-[#C8A45D]/60 hover:bg-white/10"}`}
    >
      <input ref={inputRef} type="file" accept={accept} multiple className="hidden"
        onChange={(e) => handle(e.target.files)} />
      <div className="w-16 h-16 rounded-full bg-[#C8A45D]/15 backdrop-blur-xl border border-[#C8A45D]/30 flex items-center justify-center">
        {uploading
          ? <div className="w-7 h-7 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
          : <Icon size={28} className="text-[#C8A45D]" />}
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm">
          {uploading ? "Uploading to cloud…" : `Drag & drop ${label} here`}
        </p>
        <p className="text-white/50 text-xs mt-1">
          {uploading ? "Please wait" : "or click to browse from your device"}
        </p>
      </div>
      <span className="text-xs text-[#C8A45D]/80 bg-[#C8A45D]/10 border border-[#C8A45D]/20 px-3 py-1 rounded-full">
        {uploading ? "Uploading…" : accept.split(",").join(" · ")}
      </span>
    </div>
  );
}

// ── Media Card ───────────────────────────────────────────────────────────────
function MediaCard({ item, onDelete, onPreview }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 hover:border-[#C8A45D]/50 transition-all duration-300 shadow-lg">
      <div className="aspect-square relative">
        {item.type === "photo" || item.type === "youtube"
          ? <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-black/40 flex flex-col items-center justify-center gap-2">
            <Film size={32} className="text-[#C8A45D]" />
            <span className="text-white/50 text-xs px-2 text-center truncate w-full">{item.name}</span>
          </div>}
        {item.type === "youtube" && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
            <Youtube size={11} className="text-red-500" /> YouTube
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button onClick={() => onPreview(item)}
            className="w-9 h-9 rounded-full bg-[#C8A45D] flex items-center justify-center hover:bg-[#E0C27A] transition-colors">
            <Eye size={16} className="text-black" />
          </button>
          <button onClick={() => onDelete(item)}
            className="w-9 h-9 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-600 transition-colors">
            <Trash2 size={16} className="text-white" />
          </button>
        </div>
      </div>
      <div className="px-3 py-2">
        <p className="text-white/80 text-xs truncate">{item.name}</p>
        <p className="text-white/40 text-xs">{item.size || ""}</p>
      </div>
    </div>
  );
}

// ── Preview Modal ────────────────────────────────────────────────────────────
function PreviewModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-[9998] flex items-center justify-center p-4 backdrop-blur-md" onClick={onClose}>
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors">
          <X size={24} />
        </button>
        {item.type === "photo"
          ? <img src={item.url} alt={item.name} className="w-full max-h-[80vh] object-contain rounded-2xl" />
          : item.type === "youtube"
          ? (
            <div className="w-full aspect-video rounded-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`}
                title={item.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          )
          : <video src={item.url} controls autoPlay className="w-full max-h-[80vh] rounded-2xl" />}
        <p className="text-white/60 text-sm text-center mt-3">{item.name}</p>
        {item.type === "youtube" && (
          <a href={getYouTubeWatchUrl(item.videoId)} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-[#C8A45D] text-xs mt-1 hover:underline">
            Watch on YouTube ↗
          </a>
        )}
      </div>
    </div>
  );
}

// ── Message Card ─────────────────────────────────────────────────────────────
function MessageCard({ msg, onMarkRead, onDelete }) {
  return (
    <div className={`relative rounded-2xl border backdrop-blur-xl p-5 transition-all duration-300 shadow-lg
      ${msg.is_read ? "bg-white/10 border-white/20" : "bg-[#C8A45D]/15 border-[#C8A45D]/40"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {!msg.is_read && <span className="w-2 h-2 rounded-full bg-[#C8A45D]" />}
          <p className="text-white font-semibold text-sm flex items-center gap-2">
            <User size={14} className="text-[#C8A45D]" /> {msg.name}
          </p>
        </div>
        <p className="text-white/40 text-xs whitespace-nowrap">
          {new Date(msg.created_at).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 mt-2 text-white/60 text-xs">
        <span className="flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
        {msg.phone && <span className="flex items-center gap-1"><Phone size={12} /> {msg.phone}</span>}
      </div>
      <p className="text-white/90 text-sm mt-3 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
      <div className="flex items-center gap-2 mt-4">
        {!msg.is_read && (
          <button onClick={() => onMarkRead(msg.id)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#C8A45D] text-black hover:bg-[#E0C27A] transition-colors">
            <MailOpen size={13} /> Mark as read
          </button>
        )}
        <button onClick={() => onDelete(msg.id)}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/25 transition-colors border border-red-400/20">
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
}

// ── Testimonial Card ─────────────────────────────────────────────────────────
// Approve and Publish are two separate, deliberate steps (same pattern as the
// Kohinoor Transport admin panel): Approve confirms it's a real customer,
// Publish is what actually puts it live on the website. A testimonial can
// only ever be published while it is approved — the database enforces this
// too, so this UI is a convenience, not the real security boundary.
function TestimonialCard({ item, onApprove, onReject, onRestore, onTogglePublish, onDelete }) {
  const statusStyles = {
    pending: "bg-[#C8A45D]/15 border-[#C8A45D]/40 text-[#C8A45D]",
    approved: "bg-green-500/15 border-green-500/40 text-green-400",
    rejected: "bg-red-500/15 border-red-500/40 text-red-400",
  };

  return (
    <div className={`relative rounded-2xl border backdrop-blur-xl p-5 transition-all duration-300 shadow-lg
      ${item.status === "pending" ? "bg-[#C8A45D]/10 border-[#C8A45D]/30" : "bg-white/10 border-white/20"}`}>

      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white font-semibold text-sm flex items-center gap-2">
            <User size={14} className="text-[#C8A45D]" /> {item.name}
          </p>
          <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${statusStyles[item.status] || statusStyles.pending}`}>
            {item.status}
          </span>
          {item.published && (
            <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border bg-[#C8A45D] text-black border-[#C8A45D]">
              live on site
            </span>
          )}
        </div>
        <p className="text-white/40 text-xs whitespace-nowrap">
          {new Date(item.created_at).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} className={i < item.rating ? "fill-[#C8A45D] text-[#C8A45D]" : "text-white/20"} />
        ))}
        {item.email && (
          <span className="flex items-center gap-1 text-white/40 text-xs ml-2">
            <Mail size={11} /> {item.email}
          </span>
        )}
      </div>

      <p className="text-white/90 text-sm mt-3 leading-relaxed whitespace-pre-wrap">“{item.message}”</p>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        {item.status !== "approved" && (
          <button onClick={() => onApprove(item.id)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors border border-green-400/20">
            <ThumbsUp size={13} /> Approve
          </button>
        )}
        {item.status === "approved" && (
          <button onClick={() => onTogglePublish(item.id, item.published)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border
              ${item.published
                ? "bg-white/10 text-white/70 hover:bg-white/20 border-white/10"
                : "bg-[#C8A45D]/20 text-[#C8A45D] hover:bg-[#C8A45D]/30 border-[#C8A45D]/30"}`}>
            <Star size={13} /> {item.published ? "Unpublish" : "Publish"}
          </button>
        )}
        {item.status !== "rejected" && (
          <button onClick={() => onReject(item.id)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/25 transition-colors border border-red-400/20">
            <ThumbsDown size={13} /> Reject
          </button>
        )}
        {item.status !== "pending" && (
          <button onClick={() => onRestore(item.id)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors border border-white/10">
            <RotateCcw size={13} /> Reset to pending
          </button>
        )}
        <button onClick={() => onDelete(item.id)}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/25 transition-colors border border-red-400/20 ml-auto">
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
      <div className="w-12 h-12 rounded-xl bg-[#C8A45D] flex items-center justify-center shadow-md">
        <Icon size={22} className="text-black" />
      </div>
      <div>
        <p className="text-white/50 text-xs uppercase tracking-widest">{label}</p>
        <p className="text-white text-2xl font-bold mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ── Nav Item ─────────────────────────────────────────────────────────────────
function NavItem({ icon: Icon, label, active, onClick, badge, children, expandable, expanded, onToggle }) {
  return (
    <div>
      <button
        onClick={expandable ? onToggle : onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
          ${active ? "bg-[#C8A45D] text-black shadow-md" : "text-white/60 hover:text-white hover:bg-white/10"}`}>
        <Icon size={18} />
        <span>{label}</span>
        {badge > 0 && !active && (
          <span className="ml-auto bg-[#C8A45D] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
        {expandable && (
          <ChevronDown size={14} className={`ml-auto transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        )}
        {active && !expandable && <ChevronRight size={14} className="ml-auto" />}
      </button>
      {expandable && expanded && (
        <div className="ml-4 mt-1 flex flex-col gap-1">
          {children}
        </div>
      )}
    </div>
  );
}

function SubNavItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200
        ${active ? "bg-[#C8A45D]/20 text-[#C8A45D]" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
      {label}
    </button>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
let idSeq = 0;
const uid = () => ++idSeq;
const fmtSize = (bytes) => bytes < 1048576
  ? `${(bytes / 1024).toFixed(0)} KB`
  : `${(bytes / 1048576).toFixed(1)} MB`;

const PHOTO_CATEGORIES = [
  { id: "photos", label: "All Photos", bucket: "photos", type: "photo" },
  { id: "weddings", label: "💍 Weddings", bucket: "weddings", type: "photo" },
  { id: "live-events", label: "🎤 Live Events", bucket: "liveEvents", type: "photo" },
  { id: "portrait-shoot", label: "📸 Portrait Shoot", bucket: "portraitShoot", type: "photo" },
  { id: "commercial-photos", label: "🏢 Commercial", bucket: "commercialPhotos", type: "photo" },
  { id: "team", label: "👥 Team Members", bucket: "team", type: "photo" },  // ← add this
];

const VIDEO_CATEGORIES = [
  { id: "videos", label: "All Videos", bucket: "videos", type: "video" },
  { id: "wedding-videos", label: "💍 Weddings", bucket: "weddingVideos", type: "video" },
  { id: "live-events-videos", label: "🎤 Live Events", bucket: "liveEventsVideos", type: "video" },
  { id: "music-videos", label: "🎵 Music Videos", bucket: "musicVideos", type: "video" },
  { id: "commercial-videos", label: "🎬 Commercial", bucket: "commercialVideos", type: "video" },
];

// ── YouTube Link Form ───────────────────────────────────────────────────────
// Replaces the file DropZone for every video category: the admin pastes a
// YouTube link (any common URL shape), we extract the video ID client-side,
// verify it looks valid, and save just the link + id — no file upload at all.
function YouTubeLinkForm({ onAdd, adding }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = getYouTubeId(value);
    if (!id) {
      setError("That doesn't look like a valid YouTube link.");
      return;
    }
    setError("");
    const ok = await onAdd(value.trim(), id);
    if (ok) setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-6 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 shrink-0 rounded-full bg-[#C8A45D]/15 border border-[#C8A45D]/30 flex items-center justify-center">
          <Youtube size={22} className="text-[#C8A45D]" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Add a YouTube video</p>
          <p className="text-white/50 text-xs mt-0.5">Paste the video's YouTube link — no file upload needed.</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Link2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="url"
            required
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(""); }}
            placeholder="https://www.youtube.com/watch?v=..."
            disabled={adding}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#C8A45D]/60 transition-colors disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={adding}
          className="flex items-center justify-center gap-2 bg-[#C8A45D] text-black font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#E0C27A] transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {adding
            ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            : <CloudUpload size={16} />}
          {adding ? "Adding…" : "Add Link"}
        </button>
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs">
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </form>
  );
}

// ── Category Upload Section ───────────────────────────────────────────────────
function CategorySection({ category, toast, uploading, setUploading }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const isYouTube = category.type === "video";

  useEffect(() => {
    async function load() {
      if (isYouTube) {
        const { data, error } = await supabase
          .from(YOUTUBE_TABLE)
          .select("*")
          .eq("category", category.id)
          .order("created_at", { ascending: false });
        if (!error && data) {
          setItems(data.map(row => ({
            id: row.id,
            name: row.youtube_url,
            url: getYouTubeThumbnail(row.video_id),
            videoId: row.video_id,
            type: "youtube",
            size: "",
          })));
        }
        setLoading(false);
        return;
      }

      const bucketKey = category.bucket;
      const bucketName = BUCKETS[bucketKey];
      if (!bucketName) { setLoading(false); return; }

      const { data, error } = await supabase.storage
        .from(bucketName)
        .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });

      if (!error && data) {
        const mapped = data
          .filter(f => f.name !== ".emptyFolderPlaceholder")
          .map(f => {
            const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(f.name);
            return { id: uid(), name: f.name, url: urlData.publicUrl, type: category.type, size: fmtSize(f.metadata?.size || 0), path: f.name };
          });
        setItems(mapped);
      }
      setLoading(false);
    }
    load();
  }, [category, isYouTube]);

  const handleUpload = async (files) => {
    setUploading(true);
    const bucketName = BUCKETS[category.bucket];
    const results = [];

    for (const file of files) {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { error } = await supabase.storage.from(bucketName).upload(fileName, file, { upsert: false });
      if (error) { toast(`Failed to upload ${file.name}`, "error"); continue; }
      const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
      results.push({ id: uid(), name: file.name, url: data.publicUrl, type: category.type, size: fmtSize(file.size), path: fileName });
    }

    if (results.length) {
      setItems(p => [...results, ...p]);
      toast(`${results.length} file${results.length > 1 ? "s" : ""} uploaded ☁️`);
    }
    setUploading(false);
  };

  const handleAddYouTubeLink = async (youtubeUrl, videoId) => {
    setUploading(true);
    const { data, error } = await supabase
      .from(YOUTUBE_TABLE)
      .insert({ category: category.id, youtube_url: youtubeUrl, video_id: videoId })
      .select()
      .single();
    setUploading(false);
    if (error) {
      toast("Failed to add YouTube link", "error");
      return false;
    }
    setItems(p => [{
      id: data.id,
      name: data.youtube_url,
      url: getYouTubeThumbnail(data.video_id),
      videoId: data.video_id,
      type: "youtube",
      size: "",
    }, ...p]);
    toast("YouTube video added ▶");
    return true;
  };

  const handleDelete = async (item) => {
    if (isYouTube) {
      const { error } = await supabase.from(YOUTUBE_TABLE).delete().eq("id", item.id);
      if (error) { toast("Delete failed", "error"); return; }
      setItems(p => p.filter(x => x.id !== item.id));
      toast("Video removed");
      return;
    }
    const { error } = await supabase.storage.from(BUCKETS[category.bucket]).remove([item.path]);
    if (error) { toast("Delete failed", "error"); return; }
    setItems(p => p.filter(x => x.id !== item.id));
    toast("Removed from cloud");
  };

  const accept = category.type === "photo"
    ? ".jpg,.jpeg,.png,.webp,.gif"
    : ".mp4,.mov,.webm,.avi,.mkv";

  const icon = category.type === "photo" ? Camera : Film;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-white text-2xl font-bold">{category.label}</h2>
        <p className="text-white/50 text-sm mt-1">
          {isYouTube
            ? <>{items.length} video{items.length !== 1 ? "s" : ""} · YouTube links</>
            : <>{items.length} file{items.length !== 1 ? "s" : ""} · saved to <span className="text-[#C8A45D]">{BUCKETS[category.bucket]}</span> bucket</>}
        </p>
      </div>

      {isYouTube ? (
        <YouTubeLinkForm onAdd={handleAddYouTubeLink} adding={uploading} />
      ) : (
        <DropZone
          accept={accept}
          label={category.type === "photo" ? "photos" : "videos"}
          icon={icon}
          onFiles={handleUpload}
          uploading={uploading}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          {category.type === "photo"
            ? <ImageIcon size={40} className="mx-auto mb-3" />
            : <Video size={40} className="mx-auto mb-3" />}
          <p className="text-sm">No files yet. Drop some above.</p>
        </div>
      ) : (
        <div className={`grid gap-3 ${category.type === "photo"
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"}`}>
          {items.map((item) => (
            <MediaCard key={item.id} item={item} onDelete={handleDelete} onPreview={setPreview} />
          ))}
        </div>
      )}

      <PreviewModal item={preview} onClose={() => setPreview(null)} />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [photoExpanded, setPhotoExpanded] = useState(false);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const toast = useCallback((message, type = "success") => {
    const id = uid();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  useEffect(() => {
    async function loadMedia() {
      try {
        const { data: photoFiles, error: photoErr } = await supabase.storage
          .from(BUCKETS.photos).list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
        if (photoErr) throw photoErr;
        const photoItems = (photoFiles || [])
          .filter(f => f.name !== ".emptyFolderPlaceholder")
          .map(f => {
            const { data } = supabase.storage.from(BUCKETS.photos).getPublicUrl(f.name);
            return { id: uid(), name: f.name, url: data.publicUrl, type: "photo", size: fmtSize(f.metadata?.size || 0), path: f.name };
          });
        setPhotos(photoItems);

        // All video categories are now YouTube links (no file upload), stored
        // in the youtube_videos table rather than a storage bucket.
        const { data: youtubeRows, error: videoErr } = await supabase
          .from(YOUTUBE_TABLE).select("*").order("created_at", { ascending: false });
        if (videoErr) throw videoErr;
        const videoItems = (youtubeRows || []).map(row => ({
          id: row.id,
          name: row.youtube_url,
          url: getYouTubeThumbnail(row.video_id),
          videoId: row.video_id,
          type: "youtube",
          size: "",
        }));
        setVideos(videoItems);

        const { data: msgData, error: msgErr } = await supabase
          .from("contact_submissions").select("*").order("created_at", { ascending: false });
        if (msgErr) throw msgErr;
        setMessages(msgData || []);

        const { data: testimonialData, error: testimonialErr } = await supabase
          .from("testimonials").select("*").order("created_at", { ascending: false });
        if (testimonialErr) throw testimonialErr;
        setTestimonials(testimonialData || []);
      } catch (err) {
        toast("Could not load data.", "error");
      } finally {
        setLoading(false);
      }
    }
    loadMedia();
  }, []);

  const addFiles = useCallback(async (files, mediaType) => {
    setUploading(true);
    const bucket = mediaType === "photo" ? BUCKETS.photos : BUCKETS.videos;
    const results = [];
    for (const file of files) {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: false });
      if (error) { toast(`Failed to upload ${file.name}`, "error"); continue; }
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      results.push({ id: uid(), name: file.name, url: data.publicUrl, type: mediaType, size: fmtSize(file.size), path: fileName });
    }
    if (results.length) {
      if (mediaType === "photo") setPhotos((p) => [...results, ...p]);
      else setVideos((v) => [...results, ...v]);
      toast(`${results.length} ${mediaType}${results.length > 1 ? "s" : ""} uploaded ☁️`);
    }
    setUploading(false);
  }, [toast]);

  const deleteItem = useCallback(async (item) => {
    if (item.type === "youtube") {
      const { error } = await supabase.from(YOUTUBE_TABLE).delete().eq("id", item.id);
      if (error) { toast("Delete failed", "error"); return; }
      setVideos((v) => v.filter((x) => x.id !== item.id));
      toast("Video removed");
      return;
    }
    const bucket = BUCKETS.photos;
    const { error } = await supabase.storage.from(bucket).remove([item.path]);
    if (error) { toast("Delete failed", "error"); return; }
    setPhotos((p) => p.filter((x) => x.id !== item.id));
    toast("Removed from cloud");
  }, [toast]);

  const markMessageRead = useCallback(async (id) => {
    const { error } = await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id);
    if (error) { toast("Failed to update message", "error"); return; }
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, is_read: true } : x)));
  }, [toast]);

  const deleteMessage = useCallback(async (id) => {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) { toast("Failed to delete message", "error"); return; }
    setMessages((m) => m.filter((x) => x.id !== id));
    toast("Message deleted");
  }, [toast]);

  // Approve confirms it's a real customer; it does NOT put it on the site.
  const approveTestimonial = useCallback(async (id) => {
    const { error } = await supabase.from("testimonials").update({ status: "approved" }).eq("id", id);
    if (error) { toast("Failed to approve testimonial", "error"); return; }
    setTestimonials((t) => t.map((x) => (x.id === id ? { ...x, status: "approved" } : x)));
    toast("Testimonial approved — publish it when you're ready");
  }, [toast]);

  // Reject also takes it off the site immediately (published is forced to false
  // by the database trigger, mirrored here so the UI updates instantly).
  const rejectTestimonial = useCallback(async (id) => {
    const { error } = await supabase.from("testimonials").update({ status: "rejected", published: false }).eq("id", id);
    if (error) { toast("Failed to reject testimonial", "error"); return; }
    setTestimonials((t) => t.map((x) => (x.id === id ? { ...x, status: "rejected", published: false } : x)));
    toast("Testimonial rejected");
  }, [toast]);

  const restoreTestimonial = useCallback(async (id) => {
    const { error } = await supabase.from("testimonials").update({ status: "pending", published: false }).eq("id", id);
    if (error) { toast("Failed to update testimonial", "error"); return; }
    setTestimonials((t) => t.map((x) => (x.id === id ? { ...x, status: "pending", published: false } : x)));
    toast("Moved back to pending");
  }, [toast]);

  // Publish / unpublish — only ever meaningful on an approved testimonial;
  // the database refuses to publish anything that isn't.
  const toggleTestimonialPublish = useCallback(async (id, currentlyPublished) => {
    const published = !currentlyPublished;
    const { error } = await supabase.from("testimonials").update({ published }).eq("id", id);
    if (error) { toast("Failed to update testimonial", "error"); return; }
    setTestimonials((t) => t.map((x) => (x.id === id ? { ...x, published } : x)));
    toast(published ? "Testimonial published ✅ — now live on the website" : "Testimonial unpublished");
  }, [toast]);

  const deleteTestimonial = useCallback(async (id) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) { toast("Failed to delete testimonial", "error"); return; }
    setTestimonials((t) => t.filter((x) => x.id !== id));
    toast("Testimonial deleted");
  }, [toast]);

  const handleSection = (id) => {
    setSection(id);
    setSidebarOpen(false);
  };

  // Find current category if it's a subcategory
  const currentPhotoCategory = PHOTO_CATEGORIES.find(c => c.id === section);
  const currentVideoCategory = VIDEO_CATEGORIES.find(c => c.id === section);

  return (
    <div className="relative min-h-screen flex font-sans bg-[var(--background)]">

      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent z-[9999]" />

      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-2xl border-r border-white/10
        flex flex-col z-50 transition-transform duration-300 overflow-y-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <img
                src="/panjab_logo/1.png"
                alt="logo"
                className="h-14 w-auto cursor-pointer object-contain"
                onClick={() => handleNavigation("/")}
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Panjab Studio</p>
              <p className="text-[#C8A45D] text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">

          {/* Dashboard */}
          <NavItem icon={LayoutDashboard} label="Dashboard" active={section === "dashboard"}
            onClick={() => handleSection("dashboard")} />

          {/* Photography group */}
          <NavItem
            icon={Camera} label="Photography"
            active={!!currentPhotoCategory}
            expandable expanded={photoExpanded}
            onToggle={() => setPhotoExpanded(p => !p)}
          >
            {PHOTO_CATEGORIES.map(cat => (
              <SubNavItem key={cat.id} label={cat.label}
                active={section === cat.id}
                onClick={() => handleSection(cat.id)} />
            ))}
          </NavItem>

          {/* Cinematography group */}
          <NavItem
            icon={Film} label="Cinematography"
            active={!!currentVideoCategory}
            expandable expanded={videoExpanded}
            onToggle={() => setVideoExpanded(p => !p)}
          >
            {VIDEO_CATEGORIES.map(cat => (
              <SubNavItem key={cat.id} label={cat.label}
                active={section === cat.id}
                onClick={() => handleSection(cat.id)} />
            ))}
          </NavItem>

          {/* Messages */}
          <NavItem icon={Mail} label="Messages"
            active={section === "messages"}
            badge={messages.filter(m => !m.is_read).length}
            onClick={() => handleSection("messages")} />

          {/* Testimonials */}
          <NavItem icon={Star} label="Testimonials"
            active={section === "testimonials"}
            badge={testimonials.filter(t => t.status === "pending").length}
            onClick={() => handleSection("testimonials")} />

        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate("/admin/login"); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all duration-200">
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white/60 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-white font-semibold text-sm capitalize">
                {section === "dashboard" ? "Overview" : (currentPhotoCategory?.label || currentVideoCategory?.label || section)}
              </h1>
              <p className="text-white/40 text-xs hidden sm:block">Panjab Studio · Media Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {uploading && (
              <div className="flex items-center gap-2 text-[#C8A45D] text-xs">
                <div className="w-3 h-3 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
                Uploading to cloud…
              </div>
            )}
            <div className="flex items-center gap-2 text-[#C8A45D]/70 text-xs">
              <span>Punjab Studio</span>
            </div>
            {/* <div className="flex items-center">
            <img
              src="/panjab_logo/1.png"
              alt="logo"
              className="h-12 w-auto cursor-pointer object-contain"
              onClick={() => handleNavigation("/")}
            />
          </div> */}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-10 h-10 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
              <p className="text-white/50 text-sm">Loading media from cloud…</p>
            </div>
          ) : (
            <>
              {/* Dashboard */}
              {section === "dashboard" && (
                <div className="space-y-8 ">
                  <div>
                    <h2 className="text-white text-2xl font-bold">Welcome back</h2>
                    <p className="text-white/50 text-sm mt-1">All uploads are saved to Supabase cloud.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Photos" value={photos.length} icon={ImageIcon} />
                    <StatCard label="Total Videos" value={videos.length} icon={Video} />
                    <StatCard label="New Messages" value={messages.filter(m => !m.is_read).length} icon={Mail} />
                    <StatCard label="Pending Testimonials" value={testimonials.filter(t => t.status === "pending").length} icon={Star} />
                  </div>
                  <div>
                    <h3 className="text-white/70 text-xs uppercase tracking-widest mb-4">Quick Upload</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:border-[#C8A45D]/50 hover:bg-white/15 transition-all cursor-pointer shadow-lg"
                        onClick={() => { setPhotoExpanded(true); handleSection("photos"); }}>
                        <Camera size={24} className="text-[#C8A45D] mb-3" />
                        <p className="text-white font-semibold text-sm">Upload Photos</p>
                        <p className="text-white/50 text-xs mt-1">General gallery · Photography page</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:border-[#C8A45D]/50 hover:bg-white/15 transition-all cursor-pointer shadow-lg"
                        onClick={() => { setVideoExpanded(true); handleSection("videos"); }}>
                        <Film size={24} className="text-[#C8A45D] mb-3" />
                        <p className="text-white font-semibold text-sm">Upload Videos</p>
                        <p className="text-white/50 text-xs mt-1">General gallery · Cinematography page</p>
                      </div>
                    </div>
                  </div>
                  {(photos.length > 0 || videos.length > 0) && (
                    <div>
                      <h3 className="text-white/70 text-xs uppercase tracking-widest mb-4">Recent Uploads</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[...photos, ...videos].slice(0, 8).map((item) => (
                          <MediaCard key={item.id} item={item} onDelete={deleteItem} onPreview={setPreview} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Photography categories */}
              {currentPhotoCategory && (
                <CategorySection
                  key={section}
                  category={currentPhotoCategory}
                  toast={toast}
                  uploading={uploading}
                  setUploading={setUploading}
                />
              )}

              {/* Cinematography categories */}
              {currentVideoCategory && (
                <CategorySection
                  key={section}
                  category={currentVideoCategory}
                  toast={toast}
                  uploading={uploading}
                  setUploading={setUploading}
                />
              )}

              {/* Messages */}
              {section === "messages" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-white text-2xl font-bold">Messages</h2>
                    <p className="text-white/50 text-sm mt-1">
                      {messages.length} submission{messages.length !== 1 ? "s" : ""} from your contact form
                    </p>
                  </div>
                  {messages.length === 0
                    ? <div className="text-center py-16 text-white/30"><Mail size={40} className="mx-auto mb-3" /><p className="text-sm">No messages yet.</p></div>
                    : <div className="space-y-3">
                      {messages.map((msg) => (
                        <MessageCard key={msg.id} msg={msg} onMarkRead={markMessageRead} onDelete={deleteMessage} />
                      ))}
                    </div>}
                </div>
              )}

              {/* Testimonials */}
              {section === "testimonials" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-white text-2xl font-bold">Testimonials</h2>
                    <p className="text-white/50 text-sm mt-1">
                      {testimonials.length} submission{testimonials.length !== 1 ? "s" : ""} ·{" "}
                      {testimonials.filter(t => t.status === "pending").length} waiting for review ·{" "}
                      {testimonials.filter(t => t.published).length} live on the site ·{" "}
                      approve first, then publish to put a testimonial on the website.
                    </p>
                  </div>
                  {testimonials.length === 0
                    ? <div className="text-center py-16 text-white/30"><Star size={40} className="mx-auto mb-3" /><p className="text-sm">No testimonials submitted yet.</p></div>
                    : <div className="space-y-3">
                      {testimonials.map((item) => (
                        <TestimonialCard
                          key={item.id}
                          item={item}
                          onApprove={approveTestimonial}
                          onReject={rejectTestimonial}
                          onRestore={restoreTestimonial}
                          onTogglePublish={toggleTestimonialPublish}
                          onDelete={deleteTestimonial}
                        />
                      ))}
                    </div>}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <PreviewModal item={preview} onClose={() => setPreview(null)} />
      <Toast toasts={toasts} />
    </div>
  );
}