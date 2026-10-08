"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { GoldRule, LeafMark, RidgeCrest, CirclePattern } from "./ornament";
import { Quote } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative anchor-offset bg-cream-gradient py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-4">
            <LeafMark size={18} />
            About Ridgewood
          </div>
          <h2 className="font-heading text-royal-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            Where curiosity takes root, and character finds its ridge
          </h2>
          <div className="mt-6">
            <GoldRule />
          </div>
          <p className="mt-6 text-[16px] sm:text-[17px] leading-relaxed text-navy/70 text-pretty">
            Ridgewood School, Mirganj is a CBSE primary wing founded under the
            Ashok Educational and Social Welfare Trust. Established in 2020, we
            began our journey with a Pre-Primary section in collaboration with
            Bachpan — A Play School — a renowned chain managed by S.K.
            Education Pvt. Ltd., New Delhi. Today, our dedicated team of
            qualified and trained educators is committed to the holistic
            development of over 200 students, addressing the unique needs of
            each individual.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — premium image collage (desktop only) / simple stacked (mobile) */}
          <RevealGroup className="lg:col-span-6" stagger={0.1}>
            {/* Desktop collage layout */}
            <div className="relative h-[540px] sm:h-[600px] lg:h-[640px] hidden lg:block">
              {/* MAIN — real Ridgewood classroom photo */}
              <RevealItem className="absolute left-0 top-0 w-[62%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-luxe border-4 border-cream z-10">
                <img
                  src="/gallery/uniform-students-2.png"
                  alt="Ridgewood students in classroom uniform"
                 
                 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/10 to-transparent" />

                {/* Crest badge */}
                <div className="absolute top-4 left-4">
                  <div className="glass-light rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[10.5px] tracking-luxe uppercase font-semibold text-navy">
                    <RidgeCrest size={14} color="var(--brand-navy)" accent="var(--brand-gold)" />
                    Est. 2020
                  </div>
                </div>

                {/* Caption overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                  <p className="font-heading italic text-[24px] sm:text-[28px] text-cream leading-tight font-medium">
                    Where little ones
                    <span className="block text-gradient-gold not-italic font-semibold">dream big</span>
                  </p>
                  <p className="mt-2 text-[11.5px] tracking-luxe uppercase text-cream/80 font-medium">
                    Joyful Classrooms · Mirganj
                  </p>
                </div>
              </RevealItem>

              {/* TOP RIGHT — real Independence Day photo (slightly tilted clockwise) */}
              <RevealItem
                y={20}
                className="absolute right-0 top-6 w-[38%] aspect-[4/3] rounded-2xl overflow-hidden shadow-luxe border-4 border-cream z-20"
              >
                <div style={{ transform: "rotate(4deg)" }} className="w-full h-full">
                  <div className="relative w-full h-full">
                    <img
                      src="/gallery/independence-day-2.png"
                      alt="Ridgewood Independence Day celebration"
                     
                     
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </RevealItem>

              {/* MIDDLE RIGHT — real cultural day photo (tilted counter-clockwise) */}
              <RevealItem
                y={20}
                className="absolute right-[6%] top-[42%] w-[36%] aspect-[3/4] rounded-2xl overflow-hidden shadow-luxe border-4 border-cream z-20"
              >
                <div style={{ transform: "rotate(-5deg)" }} className="w-full h-full">
                  <div className="relative w-full h-full">
                    <img
                      src="/gallery/cultural-day.png"
                      alt="Ridgewood cultural day performance"
                     
                     
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </RevealItem>

              {/* BOTTOM LEFT — real friendship day photo (small accent) */}
              <RevealItem
                y={20}
                className="absolute left-[14%] bottom-0 w-[42%] aspect-[4/3] rounded-2xl overflow-hidden shadow-luxe border-4 border-cream z-30"
              >
                <div style={{ transform: "rotate(-3deg)" }} className="w-full h-full">
                  <div className="relative w-full h-full">
                    <img
                      src="/gallery/friendship-day.png"
                      alt="Ridgewood Friendship Day"
                     
                     
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </RevealItem>

              {/* Floating stat card — top right */}
              <RevealItem
                y={20}
                className="absolute top-0 right-[8%] bg-card rounded-2xl border border-gold/25 shadow-luxe px-5 py-4 z-30 hidden sm:block"
              >
                <p className="font-heading text-[28px] font-bold text-gradient-navy leading-none">
                  200+
                </p>
                <p className="text-[10.5px] tracking-luxe uppercase text-navy/60 mt-1.5">
                  Students Nurtured
                </p>
              </RevealItem>

              {/* Floating quote card — bottom right */}
              <RevealItem
                y={20}
                className="absolute bottom-2 right-0 w-[160px] sm:w-[200px] bg-card rounded-2xl border border-gold/25 shadow-luxe p-5 z-30 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center h-10 w-10 rounded-xl bg-navy text-cream">
                    <Quote className="h-4.5 w-4.5 text-gold" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] tracking-luxe uppercase text-gold-dark font-semibold">
                      Our Promise
                    </p>
                    <p className="font-heading text-navy text-[15px] font-semibold">
                      Joyful Learning
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-navy/70">
                  Classrooms that echo with the joyful sounds of curiosity and laughter.
                </p>
              </RevealItem>
            </div>

            {/* Mobile stacked layout (simple, clean) */}
            <div className="lg:hidden space-y-4">
              <RevealItem className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe border-4 border-cream">
                <img
                  src="/gallery/uniform-students-2.png"
                  alt="Ridgewood students in classroom uniform"
                 
                 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="glass-light rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[10.5px] tracking-luxe uppercase font-semibold text-navy">
                    <RidgeCrest size={14} color="var(--brand-navy)" accent="var(--brand-gold)" />
                    Est. 2020
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="font-heading italic text-[24px] text-cream leading-tight font-medium">
                    Where little ones
                    <span className="block text-gradient-gold not-italic font-semibold">dream big</span>
                  </p>
                </div>
              </RevealItem>
              <div className="grid grid-cols-2 gap-3">
                <RevealItem className="relative aspect-square rounded-2xl overflow-hidden shadow-luxe border-4 border-cream" style={{ transform: "rotate(3deg)" }}>
                  <img src="/gallery/independence-day-2.png" alt="Independence Day" className="absolute inset-0 w-full h-full object-cover" />
                </RevealItem>
                <RevealItem className="relative aspect-square rounded-2xl overflow-hidden shadow-luxe border-4 border-cream" style={{ transform: "rotate(-3deg)" }}>
                  <img src="/gallery/cultural-day.png" alt="Cultural Day" className="absolute inset-0 w-full h-full object-cover" />
                </RevealItem>
              </div>
            </div>
          </RevealGroup>

          {/* Right — narrative content */}
          <div className="lg:col-span-6 space-y-7">
            <Reveal delay={0.05}>
              <h3 className="font-heading text-[28px] sm:text-[32px] font-bold text-navy leading-tight">
                A community rooted in equity, equity rooted in belonging.
              </h3>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[16px] leading-relaxed text-navy/75 text-pretty">
                We champion a diverse, equitable, and inclusive community where
                every individual is valued and respected — regardless of race,
                background, religion, gender identity, or cultural beliefs.
                Inclusion lies at the core of our mission: we cultivate an
                environment in which everyone feels a sense of belonging and
                can thrive academically, socially, and emotionally.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[16px] leading-relaxed text-navy/75 text-pretty">
                Our teachers act as foster parents, providing personalised
                support so that students excel not only in academics but also
                in co-curricular pursuits such as sports, art, and music. This
                holistic approach equips them to stand tall in their future
                endeavours and make meaningful contributions to our nation and
                society.
              </p>
            </Reveal>

            {/* Pillar grid */}
            <RevealGroup
              delay={0.2}
              className="grid sm:grid-cols-2 gap-4 pt-3"
              stagger={0.1}
            >
              {[
                {
                  title: "Child-Centred Pedagogy",
                  body:
                    "Modern techniques rooted in Multiple Intelligence Theory and child psychology.",
                },
                {
                  title: "Hands-on Learning",
                  body:
                    "Field studies, audio-visual aids, and experiential classroom practice.",
                },
                {
                  title: "Inclusive Community",
                  body:
                    "A culture where every student is valued and heard.",
                },
                {
                  title: "NEP 2020 Aligned",
                  body:
                    "Skill-based education preparing students for an ever-changing world.",
                },
              ].map((p) => (
                <RevealItem key={p.title}>
                  <div className="group rounded-2xl border border-navy/10 bg-card p-5 hover:border-gold/40 hover:shadow-soft transition-all">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      <span className="text-[11px] tracking-luxe uppercase text-gold-dark font-semibold">
                        Pillar
                      </span>
                    </div>
                    <h4 className="font-heading text-[18px] font-bold text-navy mb-1.5 leading-tight">
                      {p.title}
                    </h4>
                    <p className="text-[13.5px] leading-relaxed text-navy/70">
                      {p.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* History band */}
        <Reveal delay={0.1} className="mt-24">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy text-cream px-8 sm:px-14 py-14 sm:py-16 shadow-luxe">
            <CirclePattern color="oklch(0.78 0.13 75 / 0.12)" />
            <div className="absolute -top-10 -right-10 h-[280px] w-[280px] rounded-full bg-gold/10 blur-[80px]" />
            <div className="absolute -bottom-12 -left-12 h-[260px] w-[260px] rounded-full bg-navy-light/30 blur-[80px]" />
            <div className="relative grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5">
                <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold font-medium mb-4">
                  <LeafMark size={18} />
                  Our History
                </div>
                <h3 className="font-heading text-[28px] sm:text-[34px] font-bold leading-tight">
                  A Trust born of philanthropy, a School born of purpose.
                </h3>
              </div>
              <div className="md:col-span-7 space-y-4 text-[15.5px] leading-relaxed text-cream/85">
                <p>
                  Ridgewood School was founded by the distinguished philanthropist
                  and entrepreneur <span className="text-gold font-medium">Ashok Kumar Gupta</span> under
                  the Ashok Educational and Social Welfare Trust, established in
                  2024.
                </p>
                <p>
                  We are ideally situated in the heart of Mirganj — near Alam
                  Hospital, Dakshin Muhala, Hathua Mor — and began our journey
                  in April 2023 with a Pre-Primary section in collaboration with
                  Bachpan, A Play School.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-cream/15">
                  <div>
                    <p className="font-heading text-[22px] font-bold text-gold">2020</p>
                    <p className="text-[11px] tracking-luxe uppercase text-cream/60 mt-0.5">Primary Wing Est.</p>
                  </div>
                  <div>
                    <p className="font-heading text-[22px] font-bold text-gold">2023</p>
                    <p className="text-[11px] tracking-luxe uppercase text-cream/60 mt-0.5">Pre-Primary Launched</p>
                  </div>
                  <div>
                    <p className="font-heading text-[22px] font-bold text-gold">CBSE</p>
                    <p className="text-[11px] tracking-luxe uppercase text-cream/60 mt-0.5">Curriculum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
