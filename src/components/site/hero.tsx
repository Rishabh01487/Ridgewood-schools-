"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { BrandLogo, GoldRule, LeafMark, CirclePattern } from "./ornament";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Hero — clean, premium, LIGHT feel.
 * Cream background with subtle navy circle pattern, real shield logo,
 * strong typography, and a single framed real campus photo on the right.
 * No dark carousel — that felt gimmicky.
 */

export function Hero() {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-hidden bg-cream text-navy min-h-[100svh] flex flex-col justify-center pt-16 pb-12 sm:pt-20 sm:pb-16"
    >
      {/* Cloud "Admissions Open" banner at the very top of hero */}
      <div className="relative z-20 text-center px-4 mb-4 sm:mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block relative"
        >
          <div className="relative bg-card border-2 border-gold/30 rounded-full px-5 sm:px-10 py-3 sm:py-4 shadow-luxe">
            {/* Cloud bumps */}
            <div className="absolute -top-3 left-1/4 w-8 h-8 rounded-full bg-card border-2 border-gold/30 border-b-0" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-gold/30 border-b-0" />
            <div className="absolute -top-3 right-1/4 w-8 h-8 rounded-full bg-card border-2 border-gold/30 border-b-0" />
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-gold shrink-0" />
              <span className="font-heading text-[14px] sm:text-[20px] font-bold text-sunset-gradient animate-gradient-flow leading-none">
                Admissions Open
              </span>
              <span className="font-heading text-[16px] sm:text-[24px] font-bold text-royal-gradient animate-gradient-flow leading-none">
                2026–2027
              </span>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-gold shrink-0" />
            </div>
          </div>
        </motion.div>
      </div>
      {/* Layer 1 — cream gradient with subtle navy circle pattern */}
      <div className="absolute inset-0 -z-20 bg-cream-gradient" aria-hidden />
      <CirclePattern color="oklch(0.235 0.07 264 / 0.06)" />

      {/* Layer 2 — gold orbs (decorative) */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full bg-gold/12 blur-[120px]" />
        <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-navy/8 blur-[120px]" />
      </div>

      {/* Layer 3 — ridge silhouette bottom (subtle navy, ties into About) */}
      <div className="absolute bottom-0 inset-x-0 h-[24%] -z-10" aria-hidden>
        <svg
          className="absolute bottom-0 w-full h-full opacity-25"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L0,120 C160,100 220,40 360,50 C520,60 580,110 720,110 C880,110 940,30 1100,40 C1240,48 1300,100 1440,90 L1440,200 Z"
            fill="var(--brand-navy)"
          />
          <path
            d="M0,200 L0,160 C140,140 200,100 340,110 C500,122 560,160 700,158 C860,156 920,110 1080,120 C1220,128 1280,170 1440,160 L1440,200 Z"
            fill="var(--brand-navy)"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Main content — two-column on lg, stacked on mobile */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
      >
        {/* LEFT — text content */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Logo + name row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center lg:justify-start mb-8"
          >
            {/* FULL Ridgewood logo: shield + RIDGEWOOD SCHOOL + A CBSE Curriculum School subtitle (matches the user's original uploaded logo) */}
            <BrandLogo variant="full" size={72} priority className="shrink-0" />
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-5 inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-semibold"
          >
            <LeafMark size={16} />
            From Roots to Ridges
          </motion.div>

          {/* Headline — premium two-font + animated sunset gradient
              Line 1 "Where curious minds" — Poppins bold, animated warm sunset gradient (navy → maroon → coral → gold)
              Line 2 "flourish joyfully" — Playfair Display italic, animated royal gradient (deep navy → indigo → gold)
              Both lines have a flowing gradient animation for an "alive" feel */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold leading-[1.15] tracking-tight text-[28px] sm:text-[42px] lg:text-[58px] text-center lg:text-left"
          >
            <span className="text-sunset-gradient animate-gradient-flow block whitespace-nowrap">
              Where curious minds
            </span>
            <span className="font-elegant-italic font-medium text-royal-gradient animate-gradient-flow block whitespace-nowrap mt-1">
              flourish joyfully
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-6 max-w-xl mx-auto lg:mx-0 text-[16px] sm:text-[17.5px] leading-relaxed text-navy/75 text-pretty"
          >
            A CBSE curriculum school in Mirganj where child-centred, NEP 2020-aligned
            learning meets teachers who act as foster parents — and classrooms that
            echo with the joyful sounds of curiosity and laughter.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-navy text-cream hover:bg-navy-dark font-semibold px-7 py-6 text-[14.5px] tracking-wide shadow-soft hover:shadow-luxe transition-all"
            >
              <Link href="#admissions">
                Begin Your Admission
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full border border-navy/30 text-navy hover:bg-navy hover:text-cream px-7 py-6 text-[14.5px] tracking-wide font-medium"
            >
              <Link href="#parent-login">Parent Login</Link>
            </Button>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-10 grid grid-cols-3 gap-3 sm:gap-8 text-navy text-center lg:text-left"
          >
            {[
              { value: "200+", label: "Learners" },
              { value: "5+", label: "Years" },
              { value: "1:15", label: "Ratio" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center lg:items-start ${
                  i !== 0 ? "lg:border-l lg:border-navy/15 lg:pl-8" : ""
                }`}
              >
                <span className="font-heading text-[22px] sm:text-[34px] font-bold text-gradient-navy leading-none">
                  {s.value}
                </span>
                <span className="text-[9px] sm:text-[11.5px] tracking-luxe uppercase text-navy/60 mt-1.5 font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — single framed real campus photo (shown on tablet+; on mobile shown below text) */}
        <motion.div
          style={{ y: yPhoto }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 lg:col-span-5 relative mt-6 lg:mt-0 w-full"
        >
          {/* Main framed photo */}
          <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe border-4 border-cream">
            <img
              src="/gallery/uniform-students-1.png"
              alt="Ridgewood students in classroom uniform"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle warm gradient at bottom for caption legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />

            {/* Floating chip on the photo */}
            <div className="absolute top-5 left-5">
              <div className="rounded-full bg-cream/95 backdrop-blur-sm border border-gold/40 px-3.5 py-1.5 flex items-center gap-2 text-[10.5px] tracking-luxe uppercase font-semibold text-navy shadow-soft">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Est. 2020 · Mirganj
              </div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-cream">
              <p className="font-heading text-[20px] font-semibold leading-tight">
                Real classrooms.
                <span className="block text-gradient-gold">Real joy.</span>
              </p>
            </div>
          </div>

          {/* Floating mini accent photo — slightly tilted, top-right */}
          <div
            className="absolute -top-6 -right-6 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-luxe border-4 border-cream hidden md:block"
            style={{ transform: "rotate(6deg)" }}
          >
            <div className="relative w-full h-full">
              <img
                src="/gallery/independence-day-1.png"
                alt="Ridgewood Independence Day celebration"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Floating mini accent photo — bottom-left, slight tilt */}
          <div
            className="absolute -bottom-8 -left-6 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-luxe border-4 border-cream hidden md:block"
            style={{ transform: "rotate(-4deg)" }}
          >
            <div className="relative w-full h-full">
              <img
                src="/gallery/bachpan-teachers-day.png"
                alt="Teachers Day celebration"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Floating "Top of section" badge — gold pill */}
          <div className="absolute top-1/2 -left-10 -translate-y-1/2 hidden xl:flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-luxe uppercase text-navy/70 font-semibold [writing-mode:vertical-rl] rotate-180">
              Joyful Learning
            </span>
            <span className="h-12 w-px bg-gold/40" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-navy/65"
      >
        <span className="text-[10px] tracking-luxe uppercase font-medium">Scroll</span>
        <span className="grid place-items-center h-9 w-6 rounded-full border border-navy/40">
          <ChevronDown className="h-3.5 w-3.5 animate-scroll-pulse" />
        </span>
      </motion.div>
    </section>
  );
}
