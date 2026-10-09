"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";
import { GoldRule, LeafMark, CirclePattern } from "./ornament";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Visit Us",
    lines: [
      "Rajmohan Colony, Dr B N Chaudhary Lane,",
      "Near Hathwa Mor, Mirganj 841438",
    ],
  },
  {
    icon: Phone,
    label: "Call Us",
    lines: ["+91 70522 24726", "70522 24726 · 73522 24726"],
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: ["Ridgewoodmirganj@gmail.com", "Quick response guaranteed"],
  },
  {
    icon: Clock,
    label: "Office Hours",
    lines: ["Mon – Sat · 8:00 AM – 4:00 PM", "Sunday · Closed"],
  },
];

export function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setSubmitting(true);
    // simulate a network send
    window.setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Thank you for reaching out!",
        description: "Our admissions team will respond within one working day.",
      });
      try {
        formEl.reset();
      } catch {
        // ignore
      }
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative anchor-offset bg-cream py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-4">
            <LeafMark size={18} />
            Get in Touch
          </div>
          <h2 className="font-heading text-sunset-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            We&apos;d love to welcome you to the family
          </h2>
          <div className="mt-6">
            <GoldRule />
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-navy/70 text-pretty">
            Drop us a line, schedule a campus visit, or simply ask us a
            question — we read every message and reply within one working day.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact info cards */}
          <Reveal className="lg:col-span-5 space-y-4">
            {CONTACT_INFO.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-navy/10 bg-card hover:border-gold/40 hover:shadow-soft transition-all"
                >
                  <span className="grid place-items-center h-12 w-12 rounded-xl bg-navy text-cream group-hover:bg-gold group-hover:text-navy-dark transition-colors shrink-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] tracking-luxe uppercase text-gold-dark font-semibold mb-1">
                      {c.label}
                    </p>
                    {c.lines.map((l) => (
                      <p key={l} className="text-[15px] text-navy leading-relaxed">
                        {l}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Social */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[12px] tracking-luxe uppercase text-navy/55 font-medium">
                Follow
              </span>
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
                    className="grid place-items-center h-11 w-11 rounded-full border border-navy/15 bg-card text-navy hover:bg-navy hover:text-cream hover:border-navy transition-all"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="relative rounded-[2rem] bg-card border border-gold/25 shadow-luxe p-6 sm:p-10"
            >
              {/* ornament corner */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5 text-[10.5px] tracking-luxe uppercase text-gold-dark font-semibold">
                <LeafMark size={14} />
                Admissions Enquiry
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mt-7">
                <Field label="Parent's Name" name="parent" placeholder="e.g. Ashok Kumar" required />
                <Field label="Phone Number" name="phone" type="tel" placeholder="+91 70522 24726" required />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
                <Field label="Child's Age" name="age" placeholder="e.g. 6 years" />
                <div className="sm:col-span-2">
                  <SelectField
                    label="Grade of Interest"
                    name="grade"
                    options={[
                      "Pre-Primary (Bachpan)",
                      "Year 1",
                      "Year 2",
                      "Year 3",
                      "Year 4",
                      "Year 5",
                    ]}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextArea
                    label="Message"
                    name="message"
                    placeholder="Tell us a little about your child and what you're looking for…"
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[12.5px] text-navy/60">
                  By submitting, you agree to be contacted by our admissions team.
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-navy text-cream hover:bg-navy-dark px-7 py-5 text-[14px] tracking-wide font-medium shadow-soft"
                >
                  {submitting ? "Sending…" : "Send Enquiry"}
                  <Send className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Address banner + Google Map embed */}
        <Reveal className="mt-12" delay={0.1}>
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Address card */}
            <div className="lg:col-span-5">
              <div className="relative h-full rounded-[2rem] bg-navy-gradient text-cream p-8 sm:p-10 shadow-navy overflow-hidden">
                <CirclePattern color="oklch(0.78 0.13 75 / 0.12)" />
                <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-gold/15 blur-[80px]" />
                <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-navy-light/30 blur-[80px]" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 text-[11px] tracking-luxe uppercase text-gold font-semibold mb-5">
                    <MapPin className="h-3.5 w-3.5" />
                    Find Us in Mirganj
                  </div>
                  <h3 className="font-heading text-[26px] sm:text-[30px] font-bold text-cream leading-tight mb-4 text-balance">
                    Visit the Ridgewood campus
                  </h3>
                  <div className="space-y-4 text-cream/85">
                    <p className="flex items-start gap-3 text-[15px] leading-relaxed">
                      <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                      <span>
                        Rajmohan Colony, Dr B N Chaudhary Lane,
                        <br />
                        Near Hathwa Mor, Mirganj,
                        <br />
                        Bihar 841438, India
                      </span>
                    </p>
                    <p className="flex items-center gap-3 text-[15px]">
                      <Phone className="h-5 w-5 text-gold shrink-0" />
                      <a href="tel:+917052224726" className="hover:text-gold transition-colors">
                        +91 70522 24726
                      </a>
                    </p>
                    <p className="flex items-center gap-3 text-[15px]">
                      <Mail className="h-5 w-5 text-gold shrink-0" />
                      <a href="mailto:Ridgewoodmirganj@gmail.com" className="hover:text-gold transition-colors">
                        Ridgewoodmirganj@gmail.com
                      </a>
                    </p>
                    <p className="flex items-center gap-3 text-[15px]">
                      <Clock className="h-5 w-5 text-gold shrink-0" />
                      Mon – Sat · 8:00 AM – 4:00 PM
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rajmohan+Colony+Dr+B+N+Chaudhary+Lane+Near+Hathwa+Mor+Mirganj+841438"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-gold-gradient text-navy-dark font-semibold px-6 py-3 text-[13.5px] hover:shadow-gold transition-all"
                  >
                    <MapPin className="h-4 w-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="lg:col-span-7">
              <div className="relative h-full min-h-[360px] rounded-[2rem] overflow-hidden border border-gold/25 shadow-luxe bg-cream">
                <iframe
                  title="Ridgewood School, Mirganj — Google Maps location"
                  src="https://www.google.com/maps?q=Rajmohan+Colony+Dr+B+N+Chaudhary+Lane+Near+Hathwa+Mor+Mirganj+841438&z=17&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-[12px] tracking-wide font-medium text-navy/70">
        {label} {required && <span className="text-gold-dark">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-navy/15 bg-cream/50 px-4 py-3 text-[14.5px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-[12px] tracking-wide font-medium text-navy/70">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full rounded-xl border border-navy/15 bg-cream/50 px-4 py-3 text-[14.5px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all resize-none"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-[12px] tracking-wide font-medium text-navy/70">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full rounded-xl border border-navy/15 bg-cream/50 px-4 py-3 text-[14.5px] text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all appearance-none cursor-pointer"
      >
        <option value="" disabled>
          Select a grade…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
