"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, X } from "lucide-react";
import { BrandLogo } from "./ornament";

/**
 * WelcomeGate — a grand temple-style gate that visitors see on first visit
 * to the Ridgewood School website. Shows Maa Saraswati (goddess of knowledge),
 * an Admissions Open 2026-27 banner, and ornate doors that open to reveal her
 * before fading away to show the main website.
 *
 * Behavior:
 *  - Shows on first visit per browser (localStorage flag "ridgewood-welcomed-v1")
 *  - Skip button available immediately
 *  - Doors slide apart on click, revealing Saraswati for 2 seconds
 *  - Then gate fades out and main website is visible
 *  - Body scroll is locked while gate is visible
 */

const STORAGE_KEY = "ridgewood-welcomed-v1";

export function WelcomeGate() {
  const [show, setShow] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [exited, setExited] = React.useState(false);

  React.useEffect(() => {
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        const t = setTimeout(() => setShow(true), 300);
        return () => clearTimeout(t);
      } else {
        setExited(true);
      }
    } catch {
      const t = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(t);
    }
  }, []);

  React.useEffect(() => {
    if (show && !exited) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [show, exited]);

  const handleEnter = () => {
    if (opened) return;
    setOpened(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // ignore
    }
    // After doors open + Saraswati is visible for ~2.5s, fade out completely
    setTimeout(() => setExited(true), 3000);
  };

  if (exited) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: opened ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: opened ? 1.4 : 0.4, ease: "easeOut", delay: opened ? 1.6 : 0 }}
          className="fixed inset-0 z-[200] bg-navy-dark"
          aria-modal="true"
          role="dialog"
          aria-label="Welcome to Ridgewood School, Mirganj"
        >
          {/* Decorative ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gold/15 blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-navy-light/30 blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[100px]" />
          </div>

          {/* Gold ornate top/bottom borders */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent z-30" />
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent z-30" />

          {/* Skip button */}
          {!opened && (
            <button
              onClick={handleEnter}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 grid place-items-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-gold/40 bg-navy/40 backdrop-blur-sm text-cream hover:bg-gold hover:text-navy-dark hover:border-gold transition-colors"
              aria-label="Skip welcome and enter website"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Main content */}
          <div className="relative h-full w-full grid place-items-center px-4 py-10 overflow-y-auto">
            <div className="relative w-full max-w-2xl mx-auto text-center">
              {/* Top brand line */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: opened ? 0 : 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-3 sm:mb-4"
              >
                <BrandLogo variant="full" size={48} tone="white" className="mx-auto" />
              </motion.div>

              {/* Admissions Open banner */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: opened ? 0 : 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="inline-block relative mb-4 sm:mb-5"
              >
                <div className="relative bg-cream border-2 border-gold/40 rounded-full px-5 sm:px-8 py-2.5 shadow-luxe">
                  <div className="absolute -top-3 left-1/4 w-4 h-4 rounded-full bg-cream border-2 border-gold/40 border-b-0" />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cream border-2 border-gold/40 border-b-0" />
                  <div className="absolute -top-3 right-1/4 w-4 h-4 rounded-full bg-cream border-2 border-gold/40 border-b-0" />
                  <div className="relative z-10 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-gold-dark shrink-0" />
                    <span className="font-heading text-[13px] sm:text-[16px] font-bold text-sunset-gradient leading-none whitespace-nowrap">
                      Admissions Open
                    </span>
                    <span className="font-heading text-[14px] sm:text-[18px] font-bold text-royal-gradient leading-none whitespace-nowrap">
                      2026 – 2027
                    </span>
                    <Sparkles className="h-4 w-4 text-gold-dark shrink-0" />
                  </div>
                </div>
              </motion.div>

              {/* The Gate — temple-style arched doors */}
              <div className="relative mx-auto w-full max-w-[280px] sm:max-w-sm aspect-[3/4] my-2">
                {/* Saraswati image — revealed when doors open */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: opened ? 1 : 0,
                    scale: opened ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.8, delay: opened ? 0.4 : 0 }}
                  className="absolute inset-0 rounded-[1.5rem] overflow-hidden border-4 border-gold/50 shadow-luxe"
                >
                  <img
                    src="/brand/saraswati.webp"
                    alt="Maa Saraswati — Goddess of Knowledge, Music, and Arts, sitting on a lotus with veena, books, and swan"
                    width={600}
                    height={1050}
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/15 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-center text-cream">
                    <p className="font-heading italic text-[14px] sm:text-[17px] leading-tight">
                      विद्या ददाति विनयम्
                    </p>
                    <p className="text-[10px] sm:text-[11px] tracking-luxe uppercase text-gold-light mt-1">
                      Knowledge bestows humility
                    </p>
                  </div>
                </motion.div>

                {/* LEFT DOOR — slides out to the left when opened */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: opened ? "-105%" : 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0 w-1/2 rounded-l-[1.5rem] overflow-hidden shadow-2xl"
                  style={{ zIndex: 20 }}
                >
                  {/* Door body — cream/maroon gradient to look like a real temple door */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7a1a2a] via-[#4a0a18] to-[#2a0810]" />

                  {/* Gold filigree pattern overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-50">
                    <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 200 400">
                      <defs>
                        <pattern id="gate-l-filigree" width="50" height="50" patternUnits="userSpaceOnUse">
                          <circle cx="25" cy="25" r="18" fill="none" stroke="oklch(0.78 0.13 75 / 0.8)" strokeWidth="1.2" />
                          <circle cx="25" cy="25" r="10" fill="none" stroke="oklch(0.78 0.13 75 / 0.6)" strokeWidth="1" />
                          <path d="M25 7 L25 43 M7 25 L43 25" stroke="oklch(0.78 0.13 75 / 0.5)" strokeWidth="0.8" />
                          <circle cx="25" cy="25" r="2" fill="oklch(0.78 0.13 75 / 0.9)" />
                        </pattern>
                      </defs>
                      <rect width="200" height="400" fill="url(#gate-l-filigree)" />
                    </svg>
                  </div>

                  {/* Arch at top — rounded Indian temple arch */}
                  <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-[#2a0810] to-transparent" style={{ clipPath: "ellipse(100% 100% at 50% 100%)" }} />

                  {/* Gold border around the door (frame) */}
                  <div className="absolute inset-0 border-2 border-gold/60 rounded-l-[1.5rem]" />
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gold" />
                  <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gold" />
                  <div className="absolute inset-y-0 left-0 w-[3px] bg-gold" />

                  {/* Inner seam — gold bar on the right edge (where doors meet) */}
                  <div className="absolute inset-y-0 right-0 w-[4px] bg-gradient-to-b from-gold via-gold-light to-gold shadow-[0_0_8px_oklch(0.78_0.13_75)]" />

                  {/* Sanskrit ॐ ornament at top of door */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-gold text-[24px] sm:text-[28px] font-serif drop-shadow-[0_0_4px_oklch(0.78_0.13_75_/_0.6)]">
                    ॐ
                  </div>

                  {/* Decorative panel in the middle of the door */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gold/70 grid place-items-center bg-gradient-to-br from-[#2a0810] to-[#4a0a18]">
                      <span className="text-gold text-[16px] sm:text-[18px] font-serif">श्री</span>
                    </div>
                  </div>

                  {/* Door knocker / handle (gold knob near the seam) */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gold-gradient shadow-gold border-2 border-cream/50" />

                  {/* Decorative lamp/diya at bottom of door */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_3px_oklch(0.78_0.13_75)]" />
                    <div className="h-1 w-6 mt-1 rounded-full bg-gold/40" />
                  </div>
                </motion.div>

                {/* RIGHT DOOR — slides out to the right when opened */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: opened ? "105%" : 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 right-0 w-1/2 rounded-r-[1.5rem] overflow-hidden shadow-2xl"
                  style={{ zIndex: 20 }}
                >
                  {/* Door body — matching gradient */}
                  <div className="absolute inset-0 bg-gradient-to-bl from-[#7a1a2a] via-[#4a0a18] to-[#2a0810]" />

                  {/* Gold filigree pattern overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-50">
                    <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 200 400">
                      <defs>
                        <pattern id="gate-r-filigree" width="50" height="50" patternUnits="userSpaceOnUse">
                          <circle cx="25" cy="25" r="18" fill="none" stroke="oklch(0.78 0.13 75 / 0.8)" strokeWidth="1.2" />
                          <circle cx="25" cy="25" r="10" fill="none" stroke="oklch(0.78 0.13 75 / 0.6)" strokeWidth="1" />
                          <path d="M25 7 L25 43 M7 25 L43 25" stroke="oklch(0.78 0.13 75 / 0.5)" strokeWidth="0.8" />
                          <circle cx="25" cy="25" r="2" fill="oklch(0.78 0.13 75 / 0.9)" />
                        </pattern>
                      </defs>
                      <rect width="200" height="400" fill="url(#gate-r-filigree)" />
                    </svg>
                  </div>

                  {/* Arch at top */}
                  <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-[#2a0810] to-transparent" style={{ clipPath: "ellipse(100% 100% at 50% 100%)" }} />

                  {/* Gold border around the door */}
                  <div className="absolute inset-0 border-2 border-gold/60 rounded-r-[1.5rem]" />
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gold" />
                  <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gold" />
                  <div className="absolute inset-y-0 right-0 w-[3px] bg-gold" />

                  {/* Inner seam — gold bar on the left edge (where doors meet) */}
                  <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-b from-gold via-gold-light to-gold shadow-[0_0_8px_oklch(0.78_0.13_75)]" />

                  {/* Sanskrit ornament at top of door */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-gold text-[24px] sm:text-[28px] font-serif drop-shadow-[0_0_4px_oklch(0.78_0.13_75_/_0.6)]">
                    श्री
                  </div>

                  {/* Decorative panel in the middle of the door */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gold/70 grid place-items-center bg-gradient-to-bl from-[#2a0810] to-[#4a0a18]">
                      <span className="text-gold text-[16px] sm:text-[18px] font-serif">विद्या</span>
                    </div>
                  </div>

                  {/* Door knocker / handle (gold knob near the seam) */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gold-gradient shadow-gold border-2 border-cream/50" />

                  {/* Decorative lamp/diya at bottom of door */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_3px_oklch(0.78_0.13_75)]" />
                    <div className="h-1 w-6 mt-1 rounded-full bg-gold/40" />
                  </div>
                </motion.div>

                {/* Top arch — decorative element above the door seam */}
                {!opened && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-12 z-30"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-gold via-gold to-gold-dark border-2 border-cream/30 grid place-items-center">
                      <span className="text-navy-dark text-[10px] font-bold">ॐ</span>
                    </div>
                  </motion.div>
                )}

                {/* Click prompt — visible while doors are closed */}
                <AnimatePresence>
                  {!opened && (
                    <motion.button
                      onClick={handleEnter}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: [0, -4, 0] }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        opacity: { duration: 0.4, delay: 1 },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="absolute -bottom-14 sm:-bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-cream/90 hover:text-cream"
                      aria-label="Open the gate to enter Ridgewood School website"
                    >
                      <span className="text-[11px] sm:text-[12px] tracking-luxe uppercase font-medium">
                        Tap to enter
                      </span>
                      <ChevronDown className="h-5 w-5 text-gold" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Welcome heading below the gate */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: opened ? 0 : 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16 sm:mt-20"
              >
                <h1 className="font-heading text-[20px] sm:text-[26px] md:text-[30px] font-bold text-cream leading-tight text-balance">
                  Welcome to <span className="text-gradient-gold">Ridgewood School</span>, Mirganj
                </h1>
                <p className="mt-2 text-[11px] sm:text-[13px] tracking-luxe uppercase text-gold-light/80 font-medium">
                  From Roots to Ridges · Est. 2020
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
