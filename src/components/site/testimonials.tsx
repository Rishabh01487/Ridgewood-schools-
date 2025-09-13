"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";
import { GoldRule, LeafMark } from "./ornament";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  quote: string;
  accent: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Abhishek Shrivastava",
    role: "Parent · Year 3",
    initials: "AS",
    quote:
      "Ridgewood School has exceeded our expectations with its innovative teaching methods and nurturing environment. My child has shown remarkable improvement in academics and extracurricular activities.",
    accent: "from-navy to-navy-light",
  },
  {
    name: "Vikash Sharma",
    role: "Parent · Year 2",
    initials: "VS",
    quote:
      "The personalised attention and focus on holistic development at Ridgewood are truly commendable. I am thrilled to see my child's confidence and curiosity growing every day.",
    accent: "from-gold to-gold-dark",
  },
  {
    name: "Pramod Singh",
    role: "Parent · Year 1",
    initials: "PS",
    quote:
      "Ridgewood's emphasis on modern education techniques, like smart classes and the sports club, is impressive. My child loves going to school and is always eager to learn new things.",
    accent: "from-navy-light to-gold-dark",
  },
  {
    name: "Ankit Dubey",
    role: "Parent · Pre-Primary",
    initials: "AD",
    quote:
      "The dedicated teachers and well-rounded programs at Ridgewood have made a significant impact on my child's learning journey. I am grateful for the school's supportive and inspiring atmosphere.",
    accent: "from-gold-dark to-navy",
  },
  {
    name: "Anmol Kesari",
    role: "Parent · Year 4",
    initials: "AK",
    quote:
      "Ridgewood offers an excellent balance of academics, arts, and sports, ensuring my child's overall growth. I highly recommend the school to parents looking for a quality education for their children.",
    accent: "from-navy to-gold-dark",
  },
];

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-rotate
  React.useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative anchor-offset bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-4">
            <LeafMark size={18} />
            Voices from Our Community
          </div>
          <h2 className="font-heading text-royal-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            What parents say about the Ridgewood journey
          </h2>
          <div className="mt-6">
            <GoldRule />
          </div>
        </Reveal>

        <Reveal className="relative" delay={0.1}>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/25 bg-card shadow-luxe">
            {/* gold quote icon */}
            <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-gold/15">
              <Quote className="h-20 w-20 sm:h-28 sm:w-28" />
            </div>

            <div className="relative px-6 py-12 sm:px-16 sm:py-20 min-h-[360px] sm:min-h-[340px] grid place-items-center text-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -30 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-3xl mx-auto"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>

                  <blockquote className="font-heading italic text-[20px] sm:text-[26px] leading-relaxed text-navy text-balance">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center justify-center gap-4">
                    <span
                      className={`grid place-items-center h-14 w-14 rounded-full bg-gradient-to-br ${current.accent} text-cream font-heading text-[16px] font-bold shadow-soft`}
                    >
                      {current.initials}
                    </span>
                    <div className="text-left">
                      <p className="font-heading text-[16px] font-bold text-navy">
                        {current.name}
                      </p>
                      <p className="text-[12px] tracking-luxe uppercase text-gold-dark font-medium">
                        {current.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex items-center justify-between px-4 sm:px-6">
              <button
                onClick={() => paginate(-1)}
                className="grid place-items-center h-11 w-11 rounded-full bg-cream/95 border border-gold/30 text-navy hover:bg-navy hover:text-cream shadow-soft transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="grid place-items-center h-11 w-11 rounded-full bg-cream/95 border border-gold/30 text-navy hover:bg-navy hover:text-cream shadow-soft transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-7 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-navy"
                    : "w-2 bg-navy/25 hover:bg-navy/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
