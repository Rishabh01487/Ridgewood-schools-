"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { GoldRule, LeafMark, CirclePattern } from "./ornament";
import {
  X,
  CalendarDays,
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  Video,
} from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  date: string | null;
  tag: string;
  type: string;
  size: "tall" | "wide" | "regular";
}

const SIZE_CYCLE: ("tall" | "wide" | "regular")[] = ["regular", "regular", "tall", "regular", "wide", "regular"];
const TAGS = ["All", "Classroom", "Patriotic", "Cultural", "Event"];

export function Gallery() {
  const [allItems, setAllItems] = React.useState<GalleryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("All");
  const [selected, setSelected] = React.useState<GalleryItem | null>(null);

  // Fetch from /api/gallery
  React.useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => {
        const mapped = (d.items || []).map((it: any, i: number) => ({
          id: it.id,
          src: it.imageUrl,
          title: it.title,
          date: it.date,
          tag: it.tag,
          type: it.type,
          size: SIZE_CYCLE[i % SIZE_CYCLE.length],
        }));
        setAllItems(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = React.useMemo(
    () => (filter === "All" ? allItems : allItems.filter((g) => g.tag === filter)),
    [allItems, filter]
  );

  return (
    <section id="gallery" className="relative anchor-offset bg-cream py-24 sm:py-32 overflow-hidden">
      {/* Subtle navy circle pattern — matches the Ridgewood Chronicle aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden>
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 1024">
          <defs>
            <pattern id="navy-circles-gallery" width="160" height="160" patternUnits="userSpaceOnUse">
              <circle cx="80" cy="80" r="60" fill="none" stroke="oklch(0.235 0.07 264 / 0.06)" strokeWidth="1.5" />
              <circle cx="80" cy="80" r="40" fill="none" stroke="oklch(0.235 0.07 264 / 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1440" height="1024" fill="url(#navy-circles-gallery)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-4">
            <LeafMark size={18} />
            Galleria · Moments Worth Sharing
          </div>
          <h2 className="font-heading text-royal-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            A glimpse into joyful learning
          </h2>
          <div className="mt-6"><GoldRule /></div>
          <p className="mt-6 text-[16px] leading-relaxed text-navy/70 text-pretty">
            Photos and short clips from our classrooms, celebrations, and events — uploaded
            by school staff. Browse by category, or open any photo for a closer look.
          </p>
        </Reveal>

        {/* Filter chips */}
        <Reveal className="flex items-center justify-center gap-2 mb-10 flex-wrap" delay={0.05}>
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all border ${
                filter === t
                  ? "bg-navy text-cream border-navy shadow-soft"
                  : "bg-cream text-navy/75 border-navy/15 hover:border-gold/50 hover:text-navy"
              }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="h-7 w-7 animate-spin mx-auto text-gold-dark" />
            <p className="mt-2 text-navy/70 text-sm">Loading gallery…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-navy/70">No photos in this category yet. Check back soon!</p>
          </div>
        ) : (
          <RevealGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" stagger={0.06}>
            {filtered.map((item) => (
              <RevealItem
                key={item.id}
                className={item.size === "tall" ? "row-span-2" : item.size === "wide" ? "col-span-2" : ""}
              >
                <button
                  onClick={() => setSelected(item)}
                  className="group relative w-full h-full aspect-square overflow-hidden rounded-2xl border border-navy/10 hover:border-gold/50 transition-all shadow-soft hover:shadow-luxe"
                >
                  {item.type === "video" ? (
                    <video src={item.src} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/10 to-transparent opacity-90" />
                  <span className="absolute top-3 left-3 rounded-full bg-navy-dark/70 backdrop-blur-sm border border-gold/30 px-2.5 py-0.5 text-[10px] tracking-luxe uppercase text-gold-light font-semibold">{item.tag}</span>
                  {item.type === "video" && (
                    <span className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-navy-dark/70 backdrop-blur-sm border border-gold/30 text-gold">
                      <Video className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                    <p className="text-[13px] font-semibold text-cream leading-tight line-clamp-2">{item.title}</p>
                    {item.date && item.date !== "—" && (
                      <p className="text-[10.5px] text-cream/65 mt-0.5 flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {item.date}
                      </p>
                    )}
                  </div>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        {/* CTA — login to see private albums */}
        <Reveal className="mt-12" delay={0.1}>
          <div className="rounded-[2rem] bg-navy-gradient text-cream p-7 sm:p-9 text-center shadow-navy overflow-hidden relative">
            <CirclePattern color="oklch(0.78 0.13 75 / 0.12)" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-luxe uppercase text-gold font-semibold mb-3">
                <ImageIcon className="h-3.5 w-3.5" />
                Want more?
              </div>
              <h3 className="font-heading text-[24px] sm:text-[28px] font-bold text-cream mb-2">
                Parents see private albums of their own child
              </h3>
              <p className="text-[14.5px] text-cream/80 max-w-2xl mx-auto mb-6 text-pretty">
                Log in to the Parent Portal to view photos and videos of your
                child — your personal album updates every week. From the portal,
                you can download and share those moments with family.
              </p>
              <a href="#parent-login" className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient text-navy-dark font-semibold hover:shadow-gold px-7 py-3 text-[14px]">
                Open Parent Portal
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox — view-only (no download or share buttons in the public gallery) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-navy-dark/95 backdrop-blur-md grid place-items-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-navy-gradient rounded-3xl border border-gold/30 overflow-hidden shadow-luxe"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 grid place-items-center h-10 w-10 rounded-full bg-navy-dark/70 border border-gold/30 text-cream hover:bg-gold hover:text-navy transition-colors backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-[4/3]">
                {selected.type === "video" ? (
                  <video src={selected.src} controls className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <Image src={selected.src} alt={selected.title} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
                )}
              </div>
              <div className="p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-0.5 text-[10px] tracking-luxe uppercase text-gold-light font-semibold mb-2">{selected.tag}</span>
                  <h4 className="font-heading text-[22px] font-bold text-cream leading-tight">{selected.title}</h4>
                  {selected.date && selected.date !== "—" && (
                    <p className="text-[12.5px] text-cream/60 mt-1 flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {selected.date}
                    </p>
                  )}
                </div>
                <p className="text-[12px] text-cream/55 italic max-w-sm">
                  Captured at Ridgewood School, Mirganj. For downloadable photos of your child,
                  sign in to the Parent Portal.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
