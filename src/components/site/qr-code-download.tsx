"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";
import { GoldRule, LeafMark } from "./ornament";
import { Download, QrCode, Smartphone, FileText } from "lucide-react";

/**
 * QRCodeDownload — A section where visitors can view and download the
 * Ridgewood School branded QR codes:
 *   1. App/Website QR → scans to ridgewoodschools.com
 *   2. Admission Form QR → scans to ridgewoodschools.com/#admissions
 *
 * Hidden for non-staff (returns null) — only staff who are logged in see this.
 * Staff can download the QR codes for printing on flyers, banners, etc.
 */

const STAFF_EMAILS = ["Ridgewoodmirganj@gmail.com", "admin@ridgewoodmirganj.in"];

function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

export function QRCodeDownload() {
  // Lazy import useSession to avoid loading next-auth on every page
  const [session, setSession] = React.useState<any>(null);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    import("next-auth/react").then(({ useSession }) => {
      const { data, status } = useSession();
      setSession(data);
      setChecked(true);
    });
  }, []);

  // Wait for session check
  if (!checked) return null;
  if (!isStaff(session?.user?.email)) return null;

  const codes = [
    {
      src: "/qr-app.png",
      title: "Website / App QR",
      description: "Scans to ridgewoodschools.com — use on flyers, banners, social media",
      label: "Ridgewood School",
    },
    {
      src: "/qr-admissions.png",
      title: "Admission Form QR",
      description: "Scans to the admission registration form — use on admission notices, posters",
      label: "Admissions 2026-27",
    },
  ];

  const handleDownload = (src: string, filename: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative bg-cream-gradient py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-3">
            <QrCode className="h-4 w-4" />
            Staff Only · QR Code Downloads
          </div>
          <h2 className="font-heading text-sunset-gradient animate-gradient-flow font-bold leading-tight text-[26px] sm:text-[34px] text-balance">
            Download branded QR codes for printing
          </h2>
          <div className="mt-3">
            <GoldRule />
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-navy/70 text-pretty">
            Print these on flyers, banners, admission notices, business cards,
            or social media posts. Parents scan → instantly reach the website
            or admission form.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {codes.map((code, i) => (
            <motion.div
              key={code.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-navy/10 bg-card p-5 shadow-soft hover:shadow-luxe hover:border-gold/40 transition-all"
            >
              {/* QR code preview */}
              <div className="relative mx-auto w-full max-w-[200px] mb-4">
                <img
                  src={code.src}
                  alt={`QR code: ${code.title}`}
                  width={200}
                  height={225}
                  loading="lazy"
                  className="w-full h-auto rounded-xl border border-gold/20"
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-heading text-[16px] font-bold text-navy mb-1">
                  {code.title}
                </h3>
                <p className="text-[12px] text-navy/60 leading-relaxed mb-3">
                  {code.description}
                </p>
                <button
                  onClick={() => handleDownload(code.src, code.src.split("/").pop() || "qr-code.png")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy text-cream font-semibold px-4 py-2 text-[12px] hover:bg-navy-dark transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PNG
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Print tips */}
        <Reveal className="mt-6 max-w-2xl mx-auto" delay={0.2}>
          <div className="rounded-xl bg-navy/5 border border-navy/10 p-4 text-center">
            <p className="text-[12px] text-navy/65 leading-relaxed">
              <strong className="text-navy">Print tips:</strong> Use at least 2×2 cm
              for flyers, 4×4 cm for banners. The QR codes are 800×900px PNGs —
              high enough resolution for printing up to A4 size. Test scan from
              your phone before printing in bulk.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
