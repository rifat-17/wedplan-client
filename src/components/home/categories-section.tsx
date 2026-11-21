"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowUpRightIcon } from "lucide-react";



import { SectionHeading } from "./section-heading";

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CategoriesSection() {
  return (
    <section
      id="categories"
      className="scroll-mt-24 bg-blush/45 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse by category"
          title="Every Detail, Beautifully Covered"
          description="From the first photograph to the final dance, explore the services that bring a wedding together."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div
              key={category.slug}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Link
                href={`/services?category=${category.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-forest shadow-sm outline-none ring-1 ring-border/50 transition-shadow duration-300 hover:shadow-xl hover:shadow-forest/20 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:aspect-[5/4]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#141b16]/92 via-[#141b16]/35 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/15"
                />

                <span className="absolute top-3.5 left-3.5 rounded-full border border-white/25 bg-white/12 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.1em] text-white/90 uppercase backdrop-blur-md">
                  {category.vendorCount}
                </span>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <h3 className="font-serif text-[1.4rem] leading-tight font-medium tracking-tight text-white">
                      {category.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-white/70">
                      {category.description}
                    </p>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-forest">
                    <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
