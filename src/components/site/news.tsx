"use client";

import * as React from "react";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { GoldRule, LeafMark } from "./ornament";
import { CalendarDays, ArrowUpRight, Tag } from "lucide-react";

interface NewsItem {
  date: string;
  day: string;
  month: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
}

const NEWS: NewsItem[] = [
  {
    date: "2025-09-12",
    day: "12",
    month: "Sep",
    category: "Admissions",
    title: "Admissions now open for the 2026–27 academic year",
    excerpt:
      "We are now accepting applications for Pre-Primary through 5th Standard. Schedule a campus visit and meet our teachers to discover the Ridgewood difference for your child.",
    readTime: "3 min read",
  },
  {
    date: "2025-08-28",
    day: "28",
    month: "Aug",
    category: "Campus Life",
    title: "Inter-House Sports Day celebrates teamwork and spirit",
    excerpt:
      "Students from all four houses competed in football, cricket, and badminton. The day closed with a cultural showcase by our Music & Dance Club — a proud moment for parents and teachers alike.",
    readTime: "4 min read",
  },
  {
    date: "2025-08-10",
    day: "10",
    month: "Aug",
    category: "Academics",
    title: "NEP 2020-aligned learning modules introduced across all classes",
    excerpt:
      "Our updated curriculum brings even more hands-on, skill-based learning to every classroom — from the Smart Lab to the Library, all grounded in the principles of Multiple Intelligence Theory.",
    readTime: "5 min read",
  },
];

export function News() {
  return (
    <section
      id="news"
      className="relative anchor-offset bg-cream-gradient py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-4">
              <LeafMark size={18} />
              News & Updates
            </div>
            <h2 className="font-heading text-emerald-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
              From the Ridgewood chronicle
            </h2>
            <div className="mt-6">
              <GoldRule className="!justify-start" />
            </div>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[13px] tracking-luxe uppercase text-navy font-semibold hover:text-gold-dark transition-colors"
          >
            View All Stories
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <RevealGroup className="grid md:grid-cols-3 gap-6" stagger={0.12}>
          {NEWS.map((n, i) => (
            <RevealItem key={n.title}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-navy/10 bg-card hover:shadow-luxe hover:border-gold/40 transition-all duration-500">
                {/* Top — date tile */}
                <div className="relative h-44 bg-navy overflow-hidden">
                  {/* gradient */}
                  <div className="absolute inset-0 bg-navy-gradient" />
                  {/* decorative pattern */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-25"
                    viewBox="0 0 400 200"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden
                  >
                    {[...Array(5)].map((_, k) => (
                      <circle
                        key={k}
                        cx={60 + k * 80}
                        cy={60 + (k % 2) * 50}
                        r="50"
                        stroke="var(--brand-gold)"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.45"
                      />
                    ))}
                    <path
                      d="M0 200 L0 160 C120 140 200 150 400 140 L400 200 Z"
                      fill="var(--brand-navy)"
                      opacity="0.55"
                    />
                  </svg>

                  {/* date tile */}
                  <div className="absolute top-4 left-4 grid place-items-center text-center w-16 h-18 rounded-xl bg-cream border border-gold/30 shadow-soft py-2">
                    <span className="font-heading text-[26px] font-bold text-navy leading-none">
                      {n.day}
                    </span>
                    <span className="text-[10px] tracking-luxe uppercase text-gold-dark mt-1">
                      {n.month}
                    </span>
                  </div>

                  {/* category pill */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-navy-dark/60 backdrop-blur-sm px-3 py-1 text-[10.5px] tracking-luxe uppercase text-gold font-medium border border-gold/30">
                    <Tag className="h-3 w-3" />
                    {n.category}
                  </div>

                  {/* arrow on hover */}
                  <span className="absolute top-4 right-4 grid place-items-center h-10 w-10 rounded-full bg-cream/10 backdrop-blur-md border border-gold/30 text-cream opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* body */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11.5px] text-navy/55 mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-gold-dark" />
                      {new Date(n.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-navy/30" />
                    <span>{n.readTime}</span>
                  </div>
                  <h3 className="font-heading text-[20px] font-bold text-navy leading-tight mb-3 text-balance group-hover:text-navy-dark transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-navy/70 text-pretty">
                    {n.excerpt}
                  </p>
                  <a
                    href="#"
                    className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold-dark hover:text-navy transition-colors tracking-wide uppercase"
                  >
                    Read More
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
