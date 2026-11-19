"use client";

import { motion, type Variants } from "motion/react";

import { steps } from "@/data/home-data";

import { SectionHeading } from "./section-heading";

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const step: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-y border-border/70 bg-card py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From First Search to First Dance"
          description="Four calm, guided steps — no spreadsheets, no chasing emails, no surprises."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-14"
        >
          <div
            aria-hidden="true"
            className="absolute top-7 right-[12%] left-[12%] hidden border-t border-dashed border-border lg:block"
          />

          <div className="relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                variants={step}
                className="group flex flex-col items-center text-center"
              >
                <span className="relative flex size-14 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-secondary/50">
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-primary text-[0.6rem] font-semibold tracking-wide text-primary-foreground ring-4 ring-card">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="mt-5 font-serif text-[1.2rem] leading-snug font-medium tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 max-w-xs text-[0.85rem] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
