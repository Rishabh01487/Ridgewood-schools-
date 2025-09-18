"use client";

import * as React from "react";
import { Reveal } from "./reveal";
import { GoldRule, LeafMark, RidgeDivider, CirclePattern } from "./ornament";
import { Target, Eye, Compass, Globe2, Quote } from "lucide-react";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative anchor-offset bg-navy-dark text-cream py-24 sm:py-32 overflow-hidden"
    >
      {/* decorative ridge at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-32 opacity-30" aria-hidden>
        <RidgeDivider className="w-full h-full" color="var(--brand-navy)" />
      </div>
      {/* gold orbs */}
      {/* Subtle gold circle pattern across the navy section */}
      <CirclePattern color="oklch(0.78 0.13 75 / 0.10)" />
      <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-navy-light/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold font-medium mb-4">
            <LeafMark size={18} />
            Our Philosophy
          </div>
          <h2 className="font-heading text-royal-cream-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            Nurturing global citizens from roots that run deep
          </h2>
          <div className="mt-6">
            <GoldRule />
          </div>
        </Reveal>

        {/* Vision & Mission cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vision */}
          <Reveal delay={0.05}>
            <div className="group relative h-full overflow-hidden rounded-3xl glass-dark border border-gold/25 p-9">
              <div className="flex items-center gap-3 mb-6">
                <span className="grid place-items-center h-12 w-12 rounded-xl bg-gold-gradient text-navy-dark">
                  <Eye className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[11px] tracking-luxe uppercase text-gold font-semibold">
                    Our Vision
                  </p>
                  <p className="font-heading text-cream text-[18px] font-semibold leading-tight">
                    See beyond textbooks
                  </p>
                </div>
              </div>
              <p className="text-[15.5px] leading-relaxed text-cream/85">
                We focus on recognising and nurturing each student&apos;s unique
                talents and abilities, providing them with ample opportunities
                to grow. We encourage our students to strive for continuous
                self-improvement and think beyond the limitations of
                traditional textbooks.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-cream/85">
                Our aim is to develop assertive, resilient individuals who are
                well-informed about the opportunities and challenges that both
                India and the world present. In essence, Ridgewood School is
                dedicated to shaping truly global citizens.
              </p>
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gold" />
            </div>
          </Reveal>

          {/* Mission */}
          <Reveal delay={0.12}>
            <div className="group relative h-full overflow-hidden rounded-3xl glass-dark border border-gold/25 p-9">
              <div className="flex items-center gap-3 mb-6">
                <span className="grid place-items-center h-12 w-12 rounded-xl bg-gold-gradient text-navy-dark">
                  <Target className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[11px] tracking-luxe uppercase text-gold font-semibold">
                    Our Mission
                  </p>
                  <p className="font-heading text-cream text-[18px] font-semibold leading-tight">
                    Shape well-rounded individuals
                  </p>
                </div>
              </div>
              <p className="text-[15.5px] leading-relaxed text-cream/85">
                We nurture a community of responsible young individuals who are
                diligent, empathetic, and committed to making meaningful
                contributions to society. We emphasise positive reinforcement
                and mutual respect between students and teachers.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-cream/85">
                We foster a supportive environment where children can build the
                confidence to succeed — shaping well-rounded individuals who
                excel not only academically but also in athletic, social, and
                moral dimensions of life.
              </p>
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gold" />
            </div>
          </Reveal>
        </div>

        {/* Quote band */}
        <Reveal delay={0.15} className="mt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 text-gold mb-5">
              <Quote className="h-7 w-7" />
            </div>
            <p className="font-heading italic text-[22px] sm:text-[28px] leading-relaxed text-cream text-balance">
              &ldquo;Positive reinforcement and mutual respect are the soil in
              which confident, kind, and capable young people grow.&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold/60" />
              <span className="text-[12px] tracking-luxe uppercase text-gold font-medium">
                The Ridgewood Way
              </span>
              <span className="h-px w-12 bg-gold/60" />
            </div>
          </div>
        </Reveal>

        {/* Three small pillars */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Compass,
              title: "Confident",
              body: "Students who believe in themselves and their voice.",
            },
            {
              icon: Globe2,
              title: "Compassionate",
              body: "Citizens aware of their community and their world.",
            },
            {
              icon: Target,
              title: "Capable",
              body: "Learners ready to contribute meaningfully.",
            },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={0.1 + i * 0.08}>
                <div className="group rounded-2xl border border-gold/20 bg-navy/40 backdrop-blur-sm p-7 hover:border-gold/50 hover:bg-navy/60 transition-all">
                  <Icon className="h-7 w-7 text-gold mb-3" />
                  <h4 className="font-heading text-[20px] font-bold text-cream mb-1.5">
                    {p.title}
                  </h4>
                  <p className="text-[14px] leading-relaxed text-cream/70">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
