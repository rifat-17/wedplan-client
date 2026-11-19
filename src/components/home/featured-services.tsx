"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { featuredServices } from "@/data/home-data";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";
import { ServiceCard } from "./service-card";

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FeaturedServices() {
  return (
    <section
      id="featured-services"
      className="relative scroll-mt-24 bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Featured services"
            title="Find Your Perfect Wedding Team"
            description="Handpicked professionals with beautiful portfolios, honest pricing, and reviews from real couples."
          />

          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden h-10 shrink-0 rounded-full px-4 text-sm font-medium text-primary hover:bg-secondary/60 sm:inline-flex",
            )}
          >
            View All Services
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredServices.map((service) => (
            <motion.div key={service.slug} variants={card}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-full px-6 text-sm font-medium",
            )}
          >
            View All Services
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
