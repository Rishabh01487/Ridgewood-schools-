"use client";

import * as React from "react";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { GoldRule, LeafMark } from "./ornament";
import { Compass, HeartHandshake, Sparkles, Globe2 } from "lucide-react";

const PILLARS = [
  {
    icon: Sparkles,
    eyebrow: "Joyful Classrooms",
    title: "Curiosity & laughter",
    body:
      "Classrooms echo with the joyful sounds of curiosity and laughter through games and hands-on activities that nurture exploration.",
    accent: "from-navy to-navy-light",
  },
  {
    icon: Compass,
    eyebrow: "Dynamic Curriculum",
    title: "Lessons that spark growth",
    body:
      "An inspiring curriculum that sparks curiosity, promotes growth, and cultivates a lifelong love for learning.",
    accent: "from-gold to-gold-dark",
  },
  {
    icon: Globe2,
    eyebrow: "NEP 2020 Foundation",
    title: "Skills for a changing world",
    body:
      "Practical, skill-based learning that builds assertive, resilient individuals ready for India and the world.",
    accent: "from-navy-light to-gold-dark",
  },
  {
    icon: HeartHandshake,
    eyebrow: "Teachers as Foster Parents",
    title: "Personalised support",
    body:
      "Teachers act as foster parents, helping students excel in academics, sports, art, and music.",
    accent: "from-gold-dark to-navy",
  },
];

export function WhyChoose() {
  return (
    <section
      id="academics"
      className="relative anchor-offset bg-cream py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-3">
            <LeafMark size={18} />
            Why Choose Ridgewood
          </div>
          <h2 className="font-heading text-sunset-gradient animate-gradient-flow font-bold leading-tight text-[30px] sm:text-[40px] md:text-[46px] text-balance">
            A premium education, gently shaped around every child
          </h2>
          <div className="mt-4">
            <GoldRule />
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-navy/70 text-pretty">
            Four pillars hold up everything we do — a joyful classroom, a
            dynamic curriculum, a skill-first foundation, and teachers who
            genuinely care. Together, they shape well-rounded individuals
            ready for the world.
          </p>
        </Reveal>

        {/* Compact pillars grid — 2 cols on mobile+tablet, 4 cols on desktop */}
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" stagger={0.08}>
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.title}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-navy/10 bg-card p-4 sm:p-5 hover:shadow-luxe hover:border-gold/40 transition-all duration-500">
                  {/* number badge */}
                  <span className="absolute top-2.5 right-2.5 grid place-items-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-navy text-cream font-heading text-[11px] sm:text-[12px] font-bold leading-none shadow-soft">
                    {i + 1}
                  </span>

                  {/* icon — compact */}
                  <div className="relative mb-2.5 sm:mb-3 inline-flex">
                    <div className="grid place-items-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-navy text-cream shadow-soft transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-gold ring-2 ring-cream" />
                  </div>

                  <p className="text-[9px] sm:text-[10px] tracking-luxe uppercase font-semibold text-gold-dark mb-1">
                    {p.eyebrow}
                  </p>
                  <h3 className="font-heading text-[13.5px] sm:text-[16px] font-bold text-navy leading-tight mb-1.5 sm:mb-2 text-balance">
                    {p.title}
                  </h3>
                  <p className="text-[11.5px] sm:text-[13px] leading-relaxed text-navy/70 text-pretty">
                    {p.body}
                  </p>

                  {/* hover hairline */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gold" />
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
