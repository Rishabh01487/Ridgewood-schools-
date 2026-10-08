"use client";

import * as React from "react";
import { Sparkles, BookOpen, Trophy, Music, Heart, Leaf } from "lucide-react";

const ITEMS = [
  { icon: Sparkles, text: "Admissions Open for 2026–27" },
  { icon: BookOpen, text: "NEP 2020 Aligned Curriculum" },
  { icon: Trophy, text: "Inter-School Sports Champions" },
  { icon: Music, text: "Music & Dance Annual Showcase" },
  { icon: Leaf, text: "Joyful Learning since 2020" },
  { icon: Heart, text: "Teachers as Foster Parents" },
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Announcements"
      className="relative bg-navy text-cream py-3.5 overflow-hidden border-y border-gold/20"
    >
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-8 text-[13px] tracking-wide"
            >
              <Icon className="h-4 w-4 text-gold" />
              <span className="text-cream/90 font-medium">{item.text}</span>
              <span className="ml-8 text-gold/50">✦</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
