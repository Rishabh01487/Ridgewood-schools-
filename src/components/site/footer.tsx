"use client";

import * as React from "react";
import Link from "next/link";
import { BrandLogo, GoldRule, LeafMark, CirclePattern } from "./ornament";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Campus Life", href: "#campus" },
  { label: "Admissions", href: "#admissions" },
  { label: "Parent Login", href: "#parent-login" },
  { label: "Gallery", href: "#gallery" },
  { label: "News & Updates", href: "#news" },
  { label: "Staff Upload", href: "#admin-upload" },
  { label: "Admin Dashboard", href: "#admin-panel" },
  { label: "Contact", href: "#contact" },
];

const PROGRAMS = [
  "Pre-Primary (Bachpan)",
  "1st Standard",
  "2nd Standard",
  "3rd Standard",
  "4th Standard",
  "5th Standard",
  "6th Standard",
  "7th Standard",
  "8th Standard",
];

const FACILITIES_LIST = [
  "Smart Classes",
  "Library",
  "Smart Lab",
  "Sports Club",
  "Music & Dance",
  "Art & Craft",
];

export function Footer() {
  return (
    <footer className="relative bg-navy-dark text-cream overflow-hidden bg-navy-fusion navy-craft-overlay">
      {/* Top ridge ornament */}
      <div className="absolute top-0 inset-x-0 h-12 opacity-50" aria-hidden>
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0 50 L0 20 C160 30 240 5 360 12 C500 20 580 38 720 30 C860 22 920 8 1080 15 C1220 22 1300 35 1440 25 L1440 50 Z"
            fill="var(--brand-cream)"
          />
        </svg>
      </div>

      {/* Subtle gold circle pattern across the footer */}
      <CirclePattern color="oklch(0.78 0.13 75 / 0.08)" />

      {/* Gold orbs */}
      <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-gold/8 blur-[120px]" />
      <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-navy-light/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 pt-20 pb-10">
        {/* Top CTA strip */}
        <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-cream/12">
          {/* Brand — FULL white Ridgewood logo (shield + RIDGEWOOD SCHOOL + CBSE subtitle) */}
          <div className="lg:col-span-5">
            <div className="mb-5">
              <BrandLogo variant="full" size={88} tone="white" className="shrink-0" />
            </div>
            <p className="text-[15.5px] leading-relaxed text-cream/75 max-w-md text-pretty">
              A CBSE curriculum school in Mirganj nurturing curious, confident, and
              compassionate global citizens through holistic, NEP 2020-aligned
              education. From Roots to Ridges.
            </p>
            <div className="mt-6">
              <GoldRule className="!justify-start" />
            </div>
            <p className="mt-5 font-heading italic text-[18px] text-gold/90">
              &ldquo;Where curiosity takes root, and character finds its ridge.&rdquo;
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ridgewoodmirganj/" },
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1DoZFeZJ41/" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com/@ridgewoodmirganj" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid place-items-center h-11 w-11 rounded-full border border-cream/15 bg-navy text-cream hover:bg-gold hover:text-navy-dark hover:border-gold transition-all"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <p className="flex items-center gap-2 text-[11px] tracking-luxe uppercase text-gold font-semibold mb-5">
              <LeafMark size={14} />
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1.5 text-[14px] text-cream/75 hover:text-gold transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-gold/60 group-hover:translate-x-0.5 transition-transform" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2">
            <p className="flex items-center gap-2 text-[11px] tracking-luxe uppercase text-gold font-semibold mb-5">
              <LeafMark size={14} />
              Programs
            </p>
            <ul className="space-y-2.5">
              {PROGRAMS.map((p) => (
                <li key={p} className="text-[14px] text-cream/75">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities + Contact */}
          <div className="lg:col-span-2">
            <p className="flex items-center gap-2 text-[11px] tracking-luxe uppercase text-gold font-semibold mb-5">
              <LeafMark size={14} />
              Facilities
            </p>
            <ul className="space-y-2.5 mb-7">
              {FACILITIES_LIST.map((f) => (
                <li key={f} className="text-[14px] text-cream/75">
                  {f}
                </li>
              ))}
            </ul>

            <div className="space-y-2.5 text-[13px] text-cream/75">
              <p className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" />
                Rajmohan Colony, Dr B N Chaudhary Lane,
                <br />
                Near Hathwa Mor, Mirganj 841438
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold" />
                <a href="tel:+917052224726" className="hover:text-gold transition-colors">
                  +91 70522 24726
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold" />
                <a href="mailto:Ridgewoodmirganj@gmail.com" className="hover:text-gold transition-colors break-all">
                  Ridgewoodmirganj@gmail.com
                </a>
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rajmohan+Colony+Dr+B+N+Chaudhary+Lane+Near+Hathwa+Mor+Mirganj+841438"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1 text-gold-light hover:text-gold transition-colors text-[12.5px] font-medium"
              >
                <MapPin className="h-3.5 w-3.5" />
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12.5px] text-cream/55 tracking-wide">
            © {new Date().getFullYear()} Ridgewood School, Mirganj · Under the
            Ashok Educational and Social Welfare Trust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="#"
              className="text-[12.5px] text-cream/55 hover:text-gold transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-[12.5px] text-cream/55 hover:text-gold transition-colors"
            >
              Terms
            </Link>
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="grid place-items-center h-10 w-10 rounded-full border border-cream/15 text-cream hover:bg-gold hover:text-navy-dark hover:border-gold transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
