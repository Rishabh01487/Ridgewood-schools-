"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, CalendarClock, BookOpen, Award } from "lucide-react";

const STATS = [
  { icon: Users, value: "200+", label: "Curious Learners", sub: "Across Pre-Primary to 5th Standard" },
  { icon: CalendarClock, value: "5+", label: "Years of Trust", sub: "Established 2020" },
  { icon: BookOpen, value: "CBSE", label: "Curriculum", sub: "NEP 2020 aligned" },
  { icon: Award, value: "1:15", label: "Teacher Ratio", sub: "Personalised care" },
];

export function Stats() {
  return (
    <section
      aria-label="At a Glance"
      className="relative bg-cream py-16 sm:py-20 border-y border-navy/10"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <span className="grid place-items-center h-14 w-14 rounded-2xl bg-navy text-cream shadow-soft mb-4 group-hover:bg-gold group-hover:text-navy-dark transition-all">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="font-heading text-[36px] sm:text-[42px] font-bold leading-none text-gradient-navy">
                  {s.value}
                </p>
                <p className="mt-2 text-[13px] tracking-luxe uppercase text-gold-dark font-semibold">
                  {s.label}
                </p>
                <p className="mt-1 text-[12.5px] text-navy/55">{s.sub}</p>
                {i < STATS.length - 1 && (
                  <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-navy/10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
