
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export function HeroSection() {
    return (
        <section
            id="top"
            className="relative isolate min-h-[580px] scroll-mt-20 overflow-hidden bg-forest sm:min-h-[650px] lg:min-h-[720px]"
        >
            {/* Background Image */}
            <Image
                src="/images/hero-wedding.jpg"
                alt="A newlywed couple celebrating their outdoor wedding"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[65%_center] sm:object-center"
            />

            {/* Background Overlay */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-[#141b16]/55 via-[#141b16]/65 to-[#141b16]/90 sm:bg-gradient-to-r sm:from-[#141b16]/95 sm:via-[#18201a]/75 sm:to-[#18201a]/25"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141b16]/30 to-transparent sm:from-transparent"
            />

            {/* Content */}
            <div className="relative mx-auto flex min-h-[580px] w-full max-w-7xl items-center px-5 py-20 sm:min-h-[650px] sm:px-6 sm:py-24 lg:min-h-[720px] lg:px-8">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-2xl"
                >
                    {/* Badge */}
                    <motion.span
                        variants={item}
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[10px] font-medium tracking-[0.12em] text-white/90 uppercase backdrop-blur-md sm:px-3.5 sm:text-xs sm:tracking-[0.16em]"
                    >
                        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                        Wedding planning, beautifully simple
                    </motion.span>

                    {/* Heading */}
                    <motion.h1
                        variants={item}
                        className="mt-6 max-w-[14ch] font-serif text-[clamp(2.65rem,10vw,3.5rem)] leading-[1.08] font-medium tracking-tight text-white text-balance sm:mt-7 sm:max-w-xl sm:text-6xl lg:text-[4.6rem] lg:leading-[1.04]"
                    >
                        Your{" "}
                        <em className="text-[#f2d9d2] italic">
                            Dream
                        </em>{" "}
                        Wedding Starts Here
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={item}
                        className="mt-5 max-w-md text-[14px] leading-7 text-white/85 sm:mt-6 sm:text-base sm:leading-relaxed lg:text-lg"
                    >
                        Discover and book trusted wedding photographers,
                        venues, florists, caterers, and stylists — the people
                        who make your day feel effortless, all in one
                        thoughtfully curated place.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        variants={item}
                        className="mt-8 sm:mt-9"
                    >
                        <Link
                            href="/services"
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                "group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-background px-6 text-sm font-medium text-foreground shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl sm:inline-flex sm:w-auto sm:px-7"
                            )}
                        >
                            Explore Wedding Services

                            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
