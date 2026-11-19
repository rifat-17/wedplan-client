"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <section id="get-started" className="scroll-mt-24 bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-forest sm:rounded-[2.5rem]"
      >
        <Image
          src="/images/cta-wedding.jpg"
          alt="A newlywed couple celebrating under falling confetti"
          fill
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#151d18]/90 via-[#17201a]/75 to-[#17201a]/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#151d18]/70 via-transparent to-[#151d18]/30"
        />

        <div className="relative flex min-h-[24rem] flex-col items-start justify-center gap-6 px-6 py-16 sm:px-12 sm:py-20 lg:min-h-[26rem] lg:px-20">
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.22em] text-[#efd3c9] uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-[#efd3c9]/60" />
            Begin your forever
          </span>

          <h2 className="max-w-2xl font-serif text-[2.1rem] leading-[1.08] font-medium tracking-tight text-balance text-white sm:text-5xl lg:text-[3.4rem]">
            Let&apos;s Make Your Dream Wedding a Reality
          </h2>

          <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/75 sm:text-base">
            Start with a single search today, and let WedPlan bring the right
            people, prices, and possibilities together for the day you have
            always imagined.
          </p>

          <div className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 rounded-full bg-background px-7 text-sm font-medium text-foreground shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl",
              )}
            >
              Explore Services
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </Link>
            <span className="text-xs text-white/55">
              Free to browse · No booking fees
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
