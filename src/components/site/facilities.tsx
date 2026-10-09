"use client";

import * as React from "react";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { GoldRule, LeafMark } from "./ornament";
import {
  MonitorPlay,
  Library,
  FlaskConical,
  Trophy,
  Music2,
  Paintbrush,
  ArrowUpRight,
} from "lucide-react";

interface Facility {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  layout: "left" | "right";
  image: string;
}

const FACILITIES: Facility[] = [
  {
    id: "smart-classes",
    eyebrow: "Technology-Enabled Learning",
    title: "Smart Classes that bring lessons to life",
    description:
      "Ridgewood Primary School integrates smart classes to enhance the learning experience for its students. These technologically equipped classrooms make lessons more engaging through interactive audio-visual tools. Smart classes help simplify complex concepts, making education fun and accessible for young learners.",
    bullets: [
      "Interactive audio-visual tools",
      "Simplified complex concepts",
      "Blends traditional teaching with modern technology",
      "Holistic development & academic excellence",
    ],
    icon: MonitorPlay,
    tag: "Smart Classes",
    layout: "left",
    image: "/gallery/generated/classroom-joyful.webp",
  },
  {
    id: "library",
    eyebrow: "A Quiet Sanctuary of Stories",
    title: "Library built to nurture a love for reading",
    description:
      "Ridgewood School boasts a well-stocked library designed to nurture a love for reading among young learners. The library offers a wide range of age-appropriate books, including storybooks, educational materials, and reference resources. It provides a quiet and stimulating environment where students can explore, imagine, and expand their knowledge.",
    bullets: [
      "Wide range of age-appropriate books",
      "Storybooks, educational materials, references",
      "Quiet and stimulating reading environment",
      "Imagination and knowledge expansion",
    ],
    icon: Library,
    tag: "Library",
    layout: "right",
    image: "/gallery/generated/library-reading.webp",
  },
  {
    id: "smart-lab",
    eyebrow: "Hands-on Discovery",
    title: "Smart Lab & Classroom for curious minds",
    description:
      "Ridgewood Primary School features a modern Smart Lab to foster hands-on learning and skill development. Equipped with advanced tools and technology, the lab allows students to explore science, math, and other subjects through interactive experiments and activities. This innovative approach encourages curiosity, critical thinking, and problem-solving in young minds.",
    bullets: [
      "Advanced tools & technology",
      "Interactive experiments across subjects",
      "Encourages critical thinking",
      "Builds problem-solving skills",
    ],
    icon: FlaskConical,
    tag: "Smart Lab",
    layout: "left",
    image: "/gallery/generated/kid-on-balls.webp",
  },
  {
    id: "sports-club",
    eyebrow: "Discipline & Teamwork",
    title: "Sports Club that builds character",
    description:
      "Ridgewood School's Sports Club promotes physical fitness and teamwork among students through a variety of games and activities. The club encourages participation in sports like football, cricket, badminton, and more, fostering discipline and a healthy competitive spirit. By emphasising the importance of sportsmanship, it helps students develop essential life skills and maintain an active lifestyle.",
    bullets: [
      "Football, cricket, badminton & more",
      "Fosters discipline and teamwork",
      "Healthy competitive spirit",
      "Essential life skills through sports",
    ],
    icon: Trophy,
    tag: "Sports Club",
    layout: "right",
    image: "/gallery/generated/playground-running.webp",
  },
  {
    id: "music-dance",
    eyebrow: "Expression & Confidence",
    title: "Music & Dance Club for creative voices",
    description:
      "Ridgewood School's Music & Dance Club provides students with a platform to express their creativity and talents. Through regular practice and guidance, students gain confidence and enhance their skills in music and dance. The club also organises public performances, allowing students to showcase their abilities and build stage confidence.",
    bullets: [
      "Platform for creative expression",
      "Regular practice & expert guidance",
      "Public performance opportunities",
      "Builds stage confidence",
    ],
    icon: Music2,
    tag: "Music & Dance",
    layout: "left",
    image: "/gallery/generated/teacher-mentoring.webp",
  },
  {
    id: "arts-crafts",
    eyebrow: "Imagination & Craft",
    title: "Art & Craft Club for young artists",
    description:
      "Beyond academics and sport, our Art & Craft Club gives young learners the space to discover colour, form, and texture. Through guided sessions, students build fine motor skills and learn to translate their imagination onto paper, clay, and canvas — celebrating every brush stroke as a milestone in their creative journey.",
    bullets: [
      "Painting, sketching, and craft sessions",
      "Fine motor skill development",
      "Imagination translated into form",
      "Every stroke celebrated as a milestone",
    ],
    icon: Paintbrush,
    tag: "Art & Craft",
    layout: "right",
    image: "/gallery/generated/art-classroom.webp",
  },
];

export function Facilities() {
  return (
    <section
      id="campus"
      className="relative anchor-offset bg-cream-gradient py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-4">
            <LeafMark size={18} />
            Campus Life at Ridgewood
          </div>
          <h2 className="font-heading text-aurora-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            Spaces designed for joy, designed for growth
          </h2>
          <div className="mt-6">
            <GoldRule />
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-navy/70 text-pretty">
            Every classroom, lab, library, and playground is intentional — a
            stage on which children explore new ideas, build friendships, and
            discover the things they love.
          </p>
        </Reveal>

        {/* Alternating feature blocks */}
        <RevealGroup className="space-y-12" stagger={0.05}>
          {FACILITIES.map((f) => {
            const Icon = f.icon;
            const isLeft = f.layout === "left";
            return (
              <RevealItem key={f.id}>
                <article
                  id={f.id}
                  className="anchor-offset grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  {/* Visual side */}
                  <div
                    className={`relative ${
                      isLeft ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <FeatureVisual facility={f} />
                  </div>

                  {/* Text side */}
                  <div
                    className={`${isLeft ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="grid place-items-center h-12 w-12 rounded-2xl bg-navy text-cream shadow-soft">
                        <Icon className="h-6 w-6 text-gold" />
                      </span>
                      <span className="text-[11px] tracking-luxe uppercase font-semibold text-gold-dark">
                        {f.tag}
                      </span>
                    </div>
                    <p className="text-[12.5px] tracking-luxe uppercase text-navy/55 font-medium mb-2">
                      {f.eyebrow}
                    </p>
                    <h3 className="font-heading text-[28px] sm:text-[34px] font-bold text-navy leading-tight mb-5 text-balance">
                      {f.title}
                    </h3>
                    <p className="text-[16px] leading-relaxed text-navy/75 mb-6 text-pretty">
                      {f.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {f.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[14px] text-navy/80"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

function FeatureVisual({ facility }: { facility: Facility }) {
  return (
    <div className="relative aspect-[5/6] sm:aspect-[4/5] lg:aspect-[5/6] rounded-[2rem] overflow-hidden border border-gold/25 shadow-luxe bg-navy">
      {/* real campus photo backdrop */}
      <img
        src={facility.image}
        alt={facility.title}
        loading="lazy"
        width={800}
        height={960}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* gradient backdrop for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/45 to-navy-dark/30" />

      {/* big tag — top */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
        <span className="rounded-full bg-cream/10 backdrop-blur-md border border-gold/30 px-3.5 py-1.5 text-[10.5px] tracking-luxe uppercase text-cream/90 font-medium">
          {facility.tag}
        </span>
        <span className="grid place-items-center h-9 w-9 rounded-full border border-gold/40 bg-navy-dark/50 text-gold backdrop-blur-sm">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* big icon — center */}
      <div className="absolute inset-0 grid place-items-center z-10">
        <div className="grid place-items-center h-[120px] w-[120px] rounded-full border border-gold/40 bg-navy-dark/50 backdrop-blur-md shadow-gold">
          <facility.icon className="h-12 w-12 text-gold" />
        </div>
      </div>

      {/* bottom label */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-navy-dark/95 via-navy-dark/60 to-transparent z-10">
        <p className="text-[11px] tracking-luxe uppercase text-gold/90 font-medium mb-1">
          {facility.eyebrow}
        </p>
        <p className="font-heading text-cream text-[18px] font-semibold leading-tight text-pretty">
          {facility.title}
        </p>
      </div>

      {/* corner ornaments */}
      <div className="absolute top-12 left-5 h-12 w-12 border-l border-t border-gold/40 opacity-60" />
      <div className="absolute bottom-12 right-5 h-12 w-12 border-r border-b border-gold/40 opacity-60" />
    </div>
  );
}

