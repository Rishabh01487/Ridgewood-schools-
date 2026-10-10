"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";

/**
 * AdmissionsBanner — a cloud-shaped "Admissions Open 2026-2027" banner
 * that sits between the Parent Login and the Registration Form as a separator.
 * Visually looks like a soft cloud with text inside.
 */
export function AdmissionsBanner() {
  return (
    <section className="relative bg-cream-gradient py-8 sm:py-12 overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <a
            href="#admissions"
            aria-label="Admissions Open 2026-2027 — Click to apply now"
            title="Click to apply now"
            className="group block relative cursor-pointer transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream rounded-full"
          >
            {/* Cloud shape */}
            <div className="relative bg-card border-2 border-gold/30 rounded-full px-8 sm:px-14 pt-8 pb-5 sm:pt-10 sm:py-7 shadow-luxe group-hover:border-gold group-hover:shadow-gold transition-all">
              {/* Cloud bumps — overlap into cloud body, kept above text area */}
              <div className="absolute -top-4 left-1/4 w-8 h-8 rounded-full bg-card border-2 border-gold/30 border-b-0 group-hover:border-gold transition-colors" />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card border-2 border-gold/30 border-b-0 group-hover:border-gold transition-colors" />
              <div className="absolute -top-4 right-1/4 w-8 h-8 rounded-full bg-card border-2 border-gold/30 border-b-0 group-hover:border-gold transition-colors" />
              
              {/* Text — relative + z-10 ensures it always paints on top of bumps */}
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold" />
                  <span className="font-heading text-[18px] sm:text-[24px] font-bold text-sunset-gradient animate-gradient-flow leading-none">
                    Admissions Open
                  </span>
                  <Sparkles className="h-5 w-5 text-gold" />
                </div>
                <span className="font-heading text-[22px] sm:text-[32px] font-bold text-royal-gradient animate-gradient-flow leading-none">
                  2026 – 2027
                </span>
                <p className="text-[11px] sm:text-[12px] text-navy/60 tracking-wide mt-1">
                  Limited seats · Pre-Primary to 5th Standard · Apply now
                </p>
              </div>
            </div>
          </a>

          {/* Down arrow pointing to form below */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-4 flex justify-center"
          >
            <ChevronDown className="h-6 w-6 text-gold-dark/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
