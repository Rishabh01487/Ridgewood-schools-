"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { GoldRule, LeafMark, BrandLogo, CirclePattern } from "./ornament";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  Video,
  X,
  Trash2,
  Eye,
  ShieldAlert,
  Lock,
} from "lucide-react";

const TAGS = ["Classroom", "Patriotic", "Cultural", "Event"];
const STAFF_EMAILS = ["Ridgewoodmirganj@gmail.com", "admin@ridgewoodmirganj.in"]; // mirrors .env STAFF_EMAILS for client-side UI

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  tag: string;
  date: string | null;
  type: string;
  isPublic: boolean;
}

function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

export function AdminUpload() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [title, setTitle] = React.useState("");
  const [tag, setTag] = React.useState(TAGS[0]);
  const [date, setDate] = React.useState("");
  const [type, setType] = React.useState<"photo" | "video">("photo");
  const [isPublic, setIsPublic] = React.useState(true);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string>("");
  const [uploading, setUploading] = React.useState(false);
  const [items, setItems] = React.useState<GalleryItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  const staffEmail = session?.user?.email || null;
  const canUpload = isStaff(staffEmail);

  // Load existing uploads (only if staff)
  React.useEffect(() => {
    if (status === "authenticated" && canUpload) {
      fetch("/api/upload")
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((d) => setItems(d.items || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [status, canUpload]);

  const handleFile = (f: File) => {
    // Client-side validation: file type & size
    const allowedTypes = [
      "image/jpeg", "image/png", "image/webp", "image/gif",
      "video/mp4", "video/webm", "video/quicktime",
    ];
    if (!allowedTypes.includes(f.type)) {
      toast({
        title: "Unsupported file type",
        description: `Only JPEG, PNG, WebP, GIF, MP4, WebM, MOV are allowed.`,
        variant: "destructive",
      });
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 50 MB.",
        variant: "destructive",
      });
      return;
    }
    setFile(f);
    if (f.type.startsWith("video/")) setType("video");
    else setType("photo");
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Please choose a file", variant: "destructive" });
      return;
    }
    if (!title.trim()) {
      toast({ title: "Please add a title", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("tag", tag);
      formData.append("date", date);
      formData.append("type", type);
      formData.append("isPublic", isPublic ? "true" : "false");
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");
      toast({
        title: "Uploaded successfully! 🎉",
        description: `"${title}" added to the gallery.`,
      });
      setItems((prev) => [result.item, ...prev]);
      setTitle("");
      setDate("");
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="admin-upload" className="relative anchor-offset bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[11.5px] tracking-luxe uppercase text-gold-dark font-medium mb-3">
            <LeafMark size={16} />
            Staff Only
          </div>
          <h2 className="font-heading text-royal-gradient animate-gradient-flow font-bold leading-tight text-[26px] sm:text-[34px] text-balance">
            Upload gallery photos &amp; videos
          </h2>
        </div>

        {status !== "authenticated" ? (
          <div className="rounded-[1.75rem] bg-navy-gradient text-cream p-7 sm:p-9 text-center shadow-navy relative overflow-hidden">
            <CirclePattern color="oklch(0.78 0.13 75 / 0.28)" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
            <div className="relative">
              <BrandLogo variant="full" size={56} tone="white" className="mx-auto" />
              <h3 className="font-heading text-[18px] font-bold mt-3 mb-2">Staff sign-in required</h3>
              <p className="text-cream/80 text-[13.5px] mb-4 max-w-sm mx-auto">
                Sign in with a school staff account to upload.
              </p>
              <a href="#parent-login" className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient text-navy-dark font-semibold px-5 py-2.5 text-[13px] hover:shadow-gold transition-all">
                <Lock className="h-3.5 w-3.5" />
                Sign in as Staff
              </a>
            </div>
          </div>
        ) : !canUpload ? (
          <div className="rounded-[1.75rem] bg-card border-2 border-maroon/30 p-7 sm:p-9 text-center shadow-luxe">
            <ShieldAlert className="h-10 w-10 text-maroon mx-auto mb-3" />
            <h3 className="font-heading text-[18px] font-bold text-navy mb-2">Parent account — uploads not allowed</h3>
            <p className="text-navy/70 text-[13.5px] max-w-sm mx-auto mb-4">
              Signed in as <span className="font-semibold text-navy">{staffEmail}</span>.
              Only school staff can upload. Parents can browse the gallery below.
            </p>
            <a href="#gallery" className="inline-flex items-center gap-1.5 rounded-full bg-navy text-cream font-semibold px-5 py-2.5 text-[13px] hover:bg-navy-dark transition-all">
              <ImageIcon className="h-3.5 w-3.5" />
              Browse the Gallery
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Upload form */}
            <div className="lg:col-span-5">
              <form onSubmit={submit} className="rounded-[2rem] bg-card border border-gold/25 shadow-luxe p-7">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-heading text-[20px] font-bold text-navy">New Upload</h3>
                  <span className="rounded-full bg-navy text-cream px-2.5 py-0.5 text-[10px] tracking-luxe uppercase font-semibold">Staff</span>
                </div>

                {/* File drop zone */}
                <label className="block group cursor-pointer">
                  <div className={`relative rounded-2xl border-2 border-dashed transition-all overflow-hidden ${
                    preview ? "border-gold/50" : "border-navy/20 hover:border-gold/50"
                  } aspect-[4/3] grid place-items-center bg-cream/50`}>
                    {preview ? (
                      type === "video" ? (
                        <video src={preview} controls className="w-full h-full object-contain" />
                      ) : (
                        <img src={preview} alt="preview" className="absolute inset-0 w-full h-full object-contain" />
                      )
                    ) : (
                      <div className="text-center px-6">
                        <Upload className="h-10 w-10 text-navy/40 mx-auto mb-2" />
                        <p className="text-[14px] text-navy font-medium mb-1">Click to choose a file</p>
                        <p className="text-[11.5px] text-navy/55">PNG, JPG, WebP, GIF, MP4, MOV — up to 50 MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </label>

                {file && (
                  <div className="mt-3 flex items-center justify-between text-[12px] text-navy/65">
                    <span className="flex items-center gap-1.5">
                      {type === "video" ? <Video className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
                      {file.name.slice(0, 40)}{file.name.length > 40 ? "…" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setFile(null); if (preview) URL.revokeObjectURL(preview); setPreview(""); }}
                      className="text-navy/50 hover:text-maroon transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Title */}
                <div className="mt-5 space-y-1.5">
                  <label className="text-[12.5px] font-semibold text-navy">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 200))}
                    placeholder="Ex: Annual Sports Day 2025"
                    required
                    maxLength={200}
                    className="w-full rounded-xl border border-navy/15 bg-cream/50 px-4 py-3 text-[14.5px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                  />
                </div>

                {/* Tag + Date row */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[12.5px] font-semibold text-navy">Category</label>
                    <select
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full rounded-xl border border-navy/15 bg-cream/50 px-3 py-3 text-[14px] text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all cursor-pointer"
                    >
                      {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12.5px] font-semibold text-navy">Date</label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value.slice(0, 50))}
                      placeholder="Ex: Oct 25, 2025"
                      maxLength={50}
                      className="w-full rounded-xl border border-navy/15 bg-cream/50 px-4 py-3 text-[14px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                    />
                  </div>
                </div>

                {/* Public toggle */}
                <label className="mt-4 flex items-center gap-2.5 text-[13.5px] text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded border-navy/30 accent-[oklch(0.235_0.07_264)]"
                  />
                  Show in public gallery (uncheck for staff-only)
                </label>

                <Button
                  type="submit"
                  disabled={uploading || !file || !title}
                  className="mt-6 w-full rounded-full bg-navy text-cream hover:bg-navy-dark py-3.5 font-medium disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload to Gallery
                    </>
                  )}
                </Button>

                <p className="mt-3 text-center text-[11.5px] text-navy/55">
                  {process.env.CLOUDINARY_CLOUD_NAME
                    ? "Files are securely stored on Cloudinary."
                    : "Cloudinary not configured — files are stored locally."}
                </p>
              </form>
            </div>

            {/* Recent uploads */}
            <div className="lg:col-span-7">
              <div className="rounded-[2rem] bg-card border border-gold/25 shadow-luxe p-7">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-heading text-[20px] font-bold text-navy">Recent Uploads</h3>
                  <span className="text-[11.5px] tracking-luxe uppercase text-gold-dark font-semibold">
                    {items.length} items
                  </span>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="h-7 w-7 animate-spin mx-auto text-gold-dark" />
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-12 text-navy/55 text-[13.5px]">
                    No uploads yet. Use the form to add your first photo or video.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[480px] overflow-y-auto scrollbar-thin pr-2">
                    {items.map((it) => (
                      <div key={it.id} className="group relative aspect-square rounded-xl overflow-hidden border border-navy/10">
                        {it.type === "video" ? (
                          <video src={it.imageUrl} className="w-full h-full object-cover" />
                        ) : (
                          <img src={it.imageUrl} alt={it.title} className="absolute inset-0 w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-transparent to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-2.5">
                          <p className="text-[12px] font-semibold text-cream leading-tight line-clamp-2">{it.title}</p>
                          <p className="text-[10px] text-cream/70 mt-0.5 flex items-center gap-1">
                            <Eye className="h-2.5 w-2.5" />
                            {it.isPublic ? "Public" : "Staff-only"}
                          </p>
                        </div>
                        <span className="absolute top-2 left-2 rounded-full bg-navy-dark/70 backdrop-blur-sm border border-gold/30 px-2 py-0.5 text-[9px] tracking-luxe uppercase text-gold-light font-semibold">
                          {it.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
