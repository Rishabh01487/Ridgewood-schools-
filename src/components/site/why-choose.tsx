"use client";

import * as React from "react";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { GoldRule, LeafMark } from "./ornament";
import { Compass, HeartHandshake, Sparkles, Globe2 } from "lucide-react";

const PILLARS = [
  {
    icon: Sparkles,
    eyebrow: "Joyful Classrooms",
    title: "Curiosity that whispers, laughter that echoes",
    body:
      "We have built an environment where classrooms echo with the joyful sounds of curiosity and laughter from our learners. Children engage in games and hands-on activities that nurture their passion for exploration, inspiring them to eagerly explore new subjects.",
    accent: "from-navy to-navy-light",
  },
  {
    icon: Compass,
    eyebrow: "Dynamic Curriculum",
    title: "Lessons that spark growth and a lifelong love for learning",
    body:
      "Our curriculum sparks curiosity, promotes growth, and cultivates a lifelong love for learning. Engaging lessons conducted by inspiring teachers ensure that every student flourishes on their journey of discovery.",
    accent: "from-gold to-gold-dark",
  },
  {
    icon: Globe2,
    eyebrow: "NEP 2020 Foundation",
    title: "Skill-based education for an ever-changing world",
    body:
      "Through practical experiences and innovative learning methods, we prepare students with the essential skills and knowledge they need to succeed — building assertive, resilient individuals who are well-informed about the opportunities and challenges that India and the world present.",
    accent: "from-navy-light to-gold-dark",
  },
  {
    icon: HeartHandshake,
    eyebrow: "Teachers as Foster Parents",
    title: "Personalised support that helps every child stand tall",
    body:
      "Our teachers, acting as foster parents, provide personalised support so students excel not only in academics but also in co-curricular activities such as sports, art, and music — equipping them to stand tall in their future endeavours.",
    accent: "from-gold-dark to-navy",
  },
];

export function WhyChoose() {
  return (
    <section
      id="academics"
      className="relative anchor-offset bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-4">
            <LeafMark size={18} />
            Why Choose Ridgewood
          </div>
          <h2 className="font-heading text-sunset-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            A premium primary education, gently shaped around every child
          </h2>
          <div className="mt-6">
            <GoldRule />
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-navy/70 text-pretty">
            Four pillars hold up everything we do — a joyful classroom, a
            dynamic curriculum, a skill-first foundation, and teachers who
            genuinely care. Together, they shape well-rounded individuals
            ready for the world.
          </p>
        </Reveal>

        {/* Pillars grid */}
        <RevealGroup className="grid sm:grid-cols-2 gap-6" stagger={0.12}>
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.title}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-navy/10 bg-card p-8 hover:shadow-luxe hover:border-gold/40 transition-all duration-500">
                  {/* number badge — small, fits inside the card */}
                  <span className="absolute top-5 right-5 grid place-items-center h-9 w-9 rounded-full bg-navy text-cream font-heading text-[14px] font-bold leading-none shadow-soft">
                    {i + 1}
                  </span>

                  {/* icon */}
                  <div className="relative mb-6 inline-flex">
                    <div className="grid place-items-center h-16 w-16 rounded-2xl bg-navy text-cream shadow-soft transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                      <Icon className="h-7 w-7 text-gold" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-gold ring-4 ring-cream" />
                  </div>

                  <p className="text-[11px] tracking-luxe uppercase font-semibold text-gold-dark mb-2">
                    {p.eyebrow}
                  </p>
                  <h3 className="font-heading text-[22px] sm:text-[24px] font-bold text-navy leading-tight mb-4 text-balance">
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-navy/75 text-pretty">
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
