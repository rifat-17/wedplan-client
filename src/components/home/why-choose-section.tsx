"use client";

import { motion, type Variants } from "motion/react";

import { benefits } from "@/data/home-data";

import { SectionHeading } from "./section-heading";

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WhyChooseSection() {
  return (
    <section
      id="why-wedplan"
      className="scroll-mt-24 bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why WedPlan"
          title="Planning You Can Feel Good About"
          description="Thoughtful tools and genuinely vetted professionals, so you can spend less time coordinating and more time celebrating."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-forest/5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary/70 text-primary ring-1 ring-primary/10 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-[1.15rem] leading-snug font-medium tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
