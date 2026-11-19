"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRightIcon, PlayIcon, StarIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const trustAvatars = [
  { src: "/images/vendors/elena.jpg", alt: "Elena Rossi" },
  { src: "/images/vendors/marcus.jpg", alt: "Marcus Bell" },
  { src: "/images/vendors/amara.jpg", alt: "Amara Lewis" },
];

export function HeroSection() {
  return (
    <section id="top" className="relative isolate scroll-mt-24 overflow-hidden bg-forest">
      <Image
        src="/images/hero-wedding.jpg"
        alt="A newlywed couple releasing balloons during an outdoor wedding celebration"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_42%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#141b16]/92 via-[#18201a]/72 to-[#18201a]/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#141b16]/85 via-transparent to-[#141b16]/25"
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:min-h-[42rem] lg:px-8 lg:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[0.68rem] font-medium tracking-[0.16em] text-white/90 uppercase backdrop-blur-md"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Wedding planning, beautifully simple
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-serif text-[2.7rem] leading-[1.04] font-medium tracking-tight text-balance text-white sm:text-6xl lg:text-[4.6rem]"
          >
            Your <em className="text-[#f2d9d2] italic">Dream</em> Wedding
            Starts Here
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-white/80 sm:text-lg"
          >
            Discover and book trusted wedding photographers, venues, florists,
            caterers, and stylists — the people who make your day feel
            effortless, all in one thoughtfully curated place.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 rounded-full bg-background px-7 text-sm font-medium text-foreground shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/25",
              )}
            >
              Explore Wedding Services
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </Link>
            <Link
              href="#how-it-works"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full border-white/35 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 hover:text-white",
              )}
            >
              <PlayIcon className="size-3.5 fill-current" />
              How It Works
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-white/15 pt-7"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {trustAvatars.map((avatar) => (
                  <span
                    key={avatar.src}
                    className="relative size-9 overflow-hidden rounded-full border-2 border-[#1b241e]"
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <div className="text-xs leading-tight text-white/75">
                <span className="block font-medium text-white">
                  2,400+ couples
                </span>
                planned with WedPlan
              </div>
            </div>

            <span aria-hidden="true" className="hidden h-8 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2 text-xs text-white/75">
              <span className="flex items-center gap-0.5 text-[#e8c48c]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className="size-3.5 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span>
                <span className="font-medium text-white">4.9</span> from 1,800+
                reviews
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
