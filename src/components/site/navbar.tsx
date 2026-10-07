"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Phone,
  Mail,
  MapPin,
  LogIn,
  X,
  ChevronRight,
} from "lucide-react";
import { BrandLogo } from "./ornament";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Campus Life", href: "#campus" },
  { label: "Gallery", href: "#gallery" },
  { label: "Admissions", href: "#admissions" },
  { label: "Parent Login", href: "#parent-login" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("#home");

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        if (!el) return Infinity;
        return Math.abs(el.getBoundingClientRect().top - 100);
      });
      const min = Math.min(...offsets);
      const idx = offsets.indexOf(min);
      if (idx >= 0) setActive("#" + sections[idx]);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar — with full address + real contact details
          Always visible (≥sm) with progressively richer content at wider viewports. */}
      <div className="relative bg-navy-dark text-cream text-[12.5px] sm:text-[13px] overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-11 sm:h-12">
          {/* Address (hidden on small mobile) */}
          <span className="hidden md:flex items-center gap-2 shrink-0 min-w-0">
            <MapPin className="h-4 w-4 text-gold shrink-0" />
            <span className="truncate text-cream/95">
              Near Alam Hospital, Dakshin Muhala, Hathua Mor, Mirganj, Bihar 841438
            </span>
          </span>

          {/* Phone (always visible) */}
          <a
            href="tel:+919999344965"
            className="flex items-center gap-2 hover:text-gold transition-colors shrink-0 font-medium"
          >
            <Phone className="h-4 w-4 text-gold shrink-0" />
            <span className="whitespace-nowrap">+91 99993 44965</span>
          </a>

          {/* Email (hidden on small mobile, shown sm+) */}
          <a
            href="mailto:ankurarchi06@gmail.com"
            className="hidden sm:flex items-center gap-2 hover:text-gold transition-colors shrink-0 font-medium"
          >
            <Mail className="h-4 w-4 text-gold shrink-0" />
            <span className="truncate max-w-[200px] md:max-w-none">ankurarchi06@gmail.com</span>
          </a>

          {/* Admissions badge (hidden on small mobile, shown md+) */}
          <span className="hidden md:inline-block text-gold tracking-luxe font-semibold text-[11px] uppercase shrink-0">
            Admissions Open · 2025–26
          </span>
        </div>
      </div>

      {/* Main nav — with artistic ridge silhouette background */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(250,247,240,0.97)" : "rgba(250,247,240,0.95)",
          borderColor: scrolled ? "rgba(201,161,78,0.30)" : "rgba(201,161,78,0.15)",
          boxShadow: scrolled
            ? "0 8px 32px -12px rgba(17,24,58,0.22), 0 1px 0 0 rgba(201,161,78,0.15)"
            : "0 1px 0 0 rgba(201,161,78,0.08)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-md border-b bg-cream/95"
      >
        <nav
          className="relative mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-[76px]"
          aria-label="Primary"
        >
          {/* Brand — FULL Ridgewood logo (shield + RIDGEWOOD SCHOOL + CBSE Curriculum subtitle) */}
          <Link href="#home" className="group flex items-center shrink-0" aria-label="Ridgewood School, Mirganj — Home">
            <BrandLogo variant="full" size={58} priority className="shrink-0" />
          </Link>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3 py-2 text-[13px] font-medium transition-colors group ${
                  active === l.href
                    ? "text-navy"
                    : "text-navy/75 hover:text-navy"
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-px bg-gold origin-left transition-transform duration-300 ${
                    active === l.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + Parent login + mobile trigger */}
          <div className="flex items-center gap-2.5">
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="hidden lg:inline-flex rounded-full border border-navy/25 text-navy hover:bg-navy hover:text-cream px-4 py-2 text-[12.5px] font-medium tracking-wide"
            >
              <Link href="#parent-login">
                <LogIn className="h-3.5 w-3.5 mr-1.5" />
                Parent Login
              </Link>
            </Button>

            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex rounded-full bg-navy text-cream hover:bg-navy-dark px-5 py-2.5 text-[13px] font-medium tracking-wide shadow-soft"
            >
              <Link href="#admissions">
                Apply Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>

            {/* Mobile drawer trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="xl:hidden grid place-items-center h-11 w-11 rounded-full border border-gold/40 bg-cream text-navy hover:bg-navy hover:text-cream transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] bg-cream border-l border-gold/30 p-0"
              >
                <SheetHeader className="px-6 pt-6 pb-4 border-b border-gold/20">
                  <SheetTitle className="flex items-center">
                    <BrandLogo variant="full" size={56} className="shrink-0" />
                  </SheetTitle>
                </SheetHeader>

                <div className="px-4 py-4 flex flex-col gap-1">
                  {NAV_LINKS.map((l, i) => (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                          active === l.href
                            ? "bg-navy text-cream"
                            : "text-navy/85 hover:bg-navy/8"
                        }`}
                      >
                        {l.label}
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="px-6 pt-4 mt-auto border-t border-gold/20 space-y-3">
                  <Button
                    asChild
                    className="w-full rounded-full bg-navy text-cream hover:bg-navy-dark py-3"
                  >
                    <Link href="#admissions" onClick={() => setMobileOpen(false)}>
                      Apply for Admission
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-navy/30 text-navy hover:bg-navy hover:text-cream py-3"
                  >
                    <Link href="#parent-login" onClick={() => setMobileOpen(false)}>
                      <LogIn className="h-4 w-4 mr-1.5" />
                      Parent Login
                    </Link>
                  </Button>
                  <div className="mt-4 space-y-2 text-[12px] text-navy/70">
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      Near Alam Hospital, Dakshin Muhala, Hathua Mor, Mirganj, Bihar 841438
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gold" />
                      <a href="tel:+919999344965" className="hover:text-gold transition-colors">
                        +91 99993 44965
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gold" />
                      <a href="mailto:ankurarchi06@gmail.com" className="hover:text-gold transition-colors">
                        ankurarchi06@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </>
  );
}

