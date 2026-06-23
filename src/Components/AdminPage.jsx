import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ImageIcon, Video, Trash2, LogOut,
  Menu, X, Eye, CheckCircle, AlertCircle, FolderOpen,
  Film, Camera, ChevronRight, CloudUpload, Mail, MailOpen, Phone, User,
} from "lucide-react";
import { supabase, BUCKETS } from "../supabase";

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium shadow-xl
          ${t.type === "success" ? "bg-[#C8A96A] text-black" : "bg-red-500 text-white"}`}>
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
        rounded-xl p-10 transition-all duration-300
        ${uploading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${dragging ? "border-[#C8A96A] bg-[#C8A96A]/10 scale-[1.01]"
          : "border-white/20 hover:border-[#C8A96A]/60 hover:bg-white/5"}`}
    >
      <input ref={inputRef} type="file" accept={accept} multiple className="hidden"
        onChange={(e) => handle(e.target.files)} />
      <div className="w-16 h-16 rounded-full bg-[#C8A96A]/15 flex items-center justify-center">
        {uploading
          ? <div className="w-7 h-7 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
          : <Icon size={28} className="text-[#C8A96A]" />}
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm">
          {uploading ? "Uploading to cloud…" : `Drag & drop ${label} here`}
        </p>
        <p className="text-white/40 text-xs mt-1">
          {uploading ? "Please wait" : "or click to browse from your device"}
        </p>
      </div>
      <span className="text-xs text-[#C8A96A]/70 bg-[#C8A96A]/10 px-3 py-1 rounded-full">
        {uploading ? "Uploading…" : accept.split(",").join(" · ")}
      </span>
    </div>
  );
}

// ── Media Card ───────────────────────────────────────────────────────────────
function MediaCard({ item, onDelete, onPreview }) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#C8A96A]/50 transition-all duration-300">
      <div className="aspect-square relative">
        {item.type === "photo"
          ? <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-black flex flex-col items-center justify-center gap-2">
            <Film size={32} className="text-[#C8A96A]" />
            <span className="text-white/50 text-xs px-2 text-center truncate w-full">{item.name}</span>
          </div>}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button onClick={() => onPreview(item)}
            className="w-9 h-9 rounded-full bg-[#C8A96A] flex items-center justify-center hover:bg-[#b89558] transition-colors">
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
        <p className="text-white/30 text-xs">{item.size || ""}</p>
      </div>
    </div>
  );
}

// ── Preview Modal ────────────────────────────────────────────────────────────
function PreviewModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 bg-black/90 z-[9998] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors">
          <X size={24} />
        </button>
        {item.type === "photo"
          ? <img src={item.url} alt={item.name} className="w-full max-h-[80vh] object-contain rounded-xl" />
          : <video src={item.url} controls autoPlay className="w-full max-h-[80vh] rounded-xl" />}
        <p className="text-white/50 text-sm text-center mt-3">{item.name}</p>
      </div>
    </div>
  );
}

// ── Message Card ─────────────────────────────────────────────────────────────
function MessageCard({ msg, onMarkRead, onDelete }) {
  return (
    <div className={`relative rounded-xl border p-5 transition-all duration-300
      ${msg.is_read ? "bg-white/5 border-white/10" : "bg-[#C8A96A]/10 border-[#C8A96A]/40"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {!msg.is_read && <span className="w-2 h-2 rounded-full bg-[#C8A96A]" />}
          <p className="text-white font-semibold text-sm flex items-center gap-2">
            <User size={14} className="text-[#C8A96A]" /> {msg.name}
          </p>
        </div>
        <p className="text-white/30 text-xs whitespace-nowrap">
          {new Date(msg.created_at).toLocaleString()}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-2 text-white/50 text-xs">
        <span className="flex items-center gap-1">
          <Mail size={12} /> {msg.email}
        </span>
        {msg.phone && (
          <span className="flex items-center gap-1">
            <Phone size={12} /> {msg.phone}
          </span>
        )}
      </div>

      <p className="text-white/80 text-sm mt-3 leading-relaxed whitespace-pre-wrap">
        {msg.message}
      </p>

      <div className="flex items-center gap-2 mt-4">
        {!msg.is_read && (
          <button
            onClick={() => onMarkRead(msg.id)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#C8A96A] text-black hover:bg-[#b89558] transition-colors"
          >
            <MailOpen size={13} /> Mark as read
          </button>
        )}
        <button
          onClick={() => onDelete(msg.id)}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-[#C8A96A] flex items-center justify-center">
        <Icon size={22} className="text-black" />
      </div>
      <div>
        <p className="text-white/40 text-xs uppercase tracking-widest">{label}</p>
        <p className="text-white text-2xl font-bold mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ── Nav Item ─────────────────────────────────────────────────────────────────
function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
        ${active ? "bg-[#C8A96A] text-black" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
      <Icon size={18} />
      <span>{label}</span>
      {badge > 0 && !active && (
        <span className="ml-auto bg-[#C8A96A] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
      {active && <ChevronRight size={14} className="ml-auto" />}
    </button>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
let idSeq = 0;
const uid = () => ++idSeq;
const fmtSize = (bytes) => bytes < 1048576
  ? `${(bytes / 1024).toFixed(0)} KB`
  : `${(bytes / 1048576).toFixed(1)} MB`;

// ── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const toast = useCallback((message, type = "success") => {
    const id = uid();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  // ── Load existing files + messages from Supabase on mount ────────────────
  useEffect(() => {
    async function loadMedia() {
      try {
        // Load photos
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

        // Load videos
        const { data: videoFiles, error: videoErr } = await supabase.storage
          .from(BUCKETS.videos).list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
        if (videoErr) throw videoErr;

        const videoItems = (videoFiles || [])
          .filter(f => f.name !== ".emptyFolderPlaceholder")
          .map(f => {
            const { data } = supabase.storage.from(BUCKETS.videos).getPublicUrl(f.name);
            return { id: uid(), name: f.name, url: data.publicUrl, type: "video", size: fmtSize(f.metadata?.size || 0), path: f.name };
          });
        setVideos(videoItems);

        // Load contact submissions
        const { data: msgData, error: msgErr } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false });
        if (msgErr) throw msgErr;
        setMessages(msgData || []);
      } catch (err) {
        toast("Could not load data. Check Supabase config.", "error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMedia();
  }, []);

  // ── Upload files to Supabase ──────────────────────────────────────────────
  const addFiles = useCallback(async (files, mediaType) => {
    setUploading(true);
    const bucket = mediaType === "photo" ? BUCKETS.photos : BUCKETS.videos;
    const results = [];

    for (const file of files) {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: false });
      if (error) {
        toast(`Failed to upload ${file.name}`, "error");
        continue;
      }
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      results.push({ id: uid(), name: file.name, url: data.publicUrl, type: mediaType, size: fmtSize(file.size), path: fileName });
    }

    if (results.length) {
      if (mediaType === "photo") setPhotos((p) => [...results, ...p]);
      else setVideos((v) => [...results, ...v]);
      toast(`${results.length} ${mediaType}${results.length > 1 ? "s" : ""} uploaded to cloud ☁️`);
    }
    setUploading(false);
  }, [toast]);

  // ── Delete file from Supabase ─────────────────────────────────────────────
  const deleteItem = useCallback(async (item) => {
    const bucket = item.type === "photo" ? BUCKETS.photos : BUCKETS.videos;
    const { error } = await supabase.storage.from(bucket).remove([item.path]);
    if (error) { toast("Delete failed", "error"); return; }
    if (item.type === "photo") setPhotos((p) => p.filter((x) => x.id !== item.id));
    else setVideos((v) => v.filter((x) => x.id !== item.id));
    toast("Removed from cloud");
  }, [toast]);

  // ── Mark message as read ───────────────────────────────────────────────────
  const markMessageRead = useCallback(async (id) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: true })
      .eq("id", id);
    if (error) { toast("Failed to update message", "error"); return; }
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, is_read: true } : x)));
  }, [toast]);

  // ── Delete message ─────────────────────────────────────────────────────────
  const deleteMessage = useCallback(async (id) => {
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);
    if (error) { toast("Failed to delete message", "error"); return; }
    setMessages((m) => m.filter((x) => x.id !== id));
    toast("Message deleted");
  }, [toast]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "videos", label: "Videos", icon: Video },
    { id: "messages", label: "Messages", icon: Mail, badge: messages.filter(m => !m.is_read).length },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex font-sans">
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent z-[9999]" />

      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full w-64 bg-[#111111] border-r border-white/8
        flex flex-col z-50 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="px-6 py-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C8A96A] flex items-center justify-center">
              <Camera size={18} className="text-black" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Panjab Studio</p>
              <p className="text-[#C8A96A] text-xs">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem key={item.id} {...item} active={section === item.id}
              onClick={() => { setSection(item.id); setSidebarOpen(false); }} />
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/8">
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate("/admin/login"); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all duration-200">
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/8 flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white/60 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-white font-semibold text-sm capitalize">
                {section === "dashboard" ? "Overview" : section}
              </h1>
              <p className="text-white/30 text-xs hidden sm:block">Panjab Studio · Media Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {uploading && (
              <div className="flex items-center gap-2 text-[#C8A96A] text-xs">
                <div className="w-3 h-3 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
                Uploading to cloud…
              </div>
            )}
            <div className="flex items-center gap-2 text-[#C8A96A]/60 text-xs">
              <CloudUpload size={14} /> Supabase
            </div>
            <div className="w-8 h-8 rounded-full bg-[#C8A96A] flex items-center justify-center">
              <span className="text-black text-xs font-bold">PS</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-10 h-10 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
              <p className="text-white/40 text-sm">Loading media from cloud…</p>
            </div>
          ) : (
            <>
              {/* Dashboard */}
              {section === "dashboard" && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h2 className="text-white text-2xl font-bold">Welcome back</h2>
                    <p className="text-white/40 text-sm mt-1">All uploads are saved to Supabase cloud.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard label="Total Photos" value={photos.length} icon={ImageIcon} />
                    <StatCard label="Total Videos" value={videos.length} icon={Video} />
                    <StatCard label="New Messages" value={messages.filter(m => !m.is_read).length} icon={Mail} />
                  </div>
                  <div>
                    <h3 className="text-white/60 text-xs uppercase tracking-widest mb-4">Quick Upload</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-white/10 rounded-xl p-5 hover:border-[#C8A96A]/40 transition-colors cursor-pointer"
                        onClick={() => setSection("photos")}>
                        <Camera size={24} className="text-[#C8A96A] mb-3" />
                        <p className="text-white font-semibold text-sm">Upload Photos</p>
                        <p className="text-white/30 text-xs mt-1">Saved to Supabase · Shows on Photography page</p>
                      </div>
                      <div className="border border-white/10 rounded-xl p-5 hover:border-[#C8A96A]/40 transition-colors cursor-pointer"
                        onClick={() => setSection("videos")}>
                        <Film size={24} className="text-[#C8A96A] mb-3" />
                        <p className="text-white font-semibold text-sm">Upload Videos</p>
                        <p className="text-white/30 text-xs mt-1">Saved to Supabase · Shows on Cinematography page</p>
                      </div>
                    </div>
                  </div>
                  {(photos.length > 0 || videos.length > 0) && (
                    <div>
                      <h3 className="text-white/60 text-xs uppercase tracking-widest mb-4">Recent Uploads</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[...photos, ...videos].slice(0, 8).map((item) => (
                          <MediaCard key={item.id} item={item} onDelete={deleteItem} onPreview={setPreview} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Photos */}
              {section === "photos" && (
                <div className="space-y-6 max-w-5xl">
                  <div>
                    <h2 className="text-white text-2xl font-bold">Photos</h2>
                    <p className="text-white/40 text-sm mt-1">{photos.length} photo{photos.length !== 1 ? "s" : ""} · saved to Supabase</p>
                  </div>
                  <DropZone accept=".jpg,.jpeg,.png,.webp,.gif" label="photos" icon={Camera}
                    onFiles={(files) => addFiles(files, "photo")} uploading={uploading} />
                  {photos.length === 0
                    ? <div className="text-center py-16 text-white/20"><ImageIcon size={40} className="mx-auto mb-3" /><p className="text-sm">No photos yet.</p></div>
                    : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {photos.map((item) => (
                        <MediaCard key={item.id} item={item} onDelete={deleteItem} onPreview={setPreview} />
                      ))}
                    </div>}
                </div>
              )}

              {/* Videos */}
              {section === "videos" && (
                <div className="space-y-6 max-w-5xl">
                  <div>
                    <h2 className="text-white text-2xl font-bold">Videos</h2>
                    <p className="text-white/40 text-sm mt-1">{videos.length} video{videos.length !== 1 ? "s" : ""} · saved to Supabase</p>
                  </div>
                  <DropZone accept=".mp4,.mov,.webm,.avi,.mkv" label="videos" icon={Film}
                    onFiles={(files) => addFiles(files, "video")} uploading={uploading} />
                  {videos.length === 0
                    ? <div className="text-center py-16 text-white/20"><Video size={40} className="mx-auto mb-3" /><p className="text-sm">No videos yet.</p></div>
                    : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {videos.map((item) => (
                        <MediaCard key={item.id} item={item} onDelete={deleteItem} onPreview={setPreview} />
                      ))}
                    </div>}
                </div>
              )}

              {/* Messages */}
              {section === "messages" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-white text-2xl font-bold">Messages</h2>
                    <p className="text-white/40 text-sm mt-1">
                      {messages.length} submission{messages.length !== 1 ? "s" : ""} from your contact form
                    </p>
                  </div>
                  {messages.length === 0
                    ? <div className="text-center py-16 text-white/20"><Mail size={40} className="mx-auto mb-3" /><p className="text-sm">No messages yet.</p></div>
                    : <div className="space-y-3">
                      {messages.map((msg) => (
                        <MessageCard key={msg.id} msg={msg} onMarkRead={markMessageRead} onDelete={deleteMessage} />
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