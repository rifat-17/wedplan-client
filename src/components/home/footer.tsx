"use client";

import Link from "next/link";
import {
    MailIcon,
    MapPinIcon,
    PhoneIcon,
} from "lucide-react";

// Reusable brand logo matching the navbar
function Brand() {
    return (
        <Link
            href="/"
            aria-label="WedPlan home"
            className="group flex shrink-0 items-center gap-2.5"
        >
            <span
                aria-hidden="true"
                className="relative flex size-9 items-center justify-center rounded-full border border-border/80 bg-card shadow-sm transition-transform duration-300 group-hover:-rotate-3"
            >
                <span className="absolute size-4 -translate-x-[3px] rounded-full border border-primary/80" />
                <span className="absolute size-4 translate-x-[3px] rounded-full border border-accent" />
            </span>

            <span className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]">
                Wed<span className="text-primary">Plan</span>
            </span>
        </Link>
    );
}

const FOOTER_LINKS = [
    {
        title: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Browse Services", href: "/services" },
        ],
    },
    {
        title: "Account",
        links: [
            { label: "Sign In", href: "/sign-in" },
            { label: "Sign Up", href: "/sign-up" },
        ],
    },
];



export default function Footer() {
    return (
        <footer className="border-t border-border/70 bg-secondary/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">

                    {/* Brand & Description */}
                    <div className="lg:col-span-1">
                        <Brand />

                        <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
                            Make your special day unforgettable with WedPlan.
                            Discover trusted wedding vendors, explore services,
                            and bring your dream wedding to life.
                        </p>

                        {/* Social Links */}
                        {/* <div className="mt-6 flex items-center gap-3">
                            {SOCIAL_LINKS.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                    >
                                        <Icon size={17} />
                                    </Link>
                                );
                            })}
                        </div> */}
                    </div>

                    {/* Navigation Links */}
                    {FOOTER_LINKS.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-5 text-sm font-semibold text-foreground">
                                {group.title}
                            </h3>

                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Information */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold text-foreground">
                            Get in Touch
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MailIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                                <a
                                    href="mailto:support@wedplan.com"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    support@wedplan.com
                                </a>
                            </li>

                            <li className="flex items-start gap-3">
                                <PhoneIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                                <a
                                    href="tel:+8801912345678"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    +880 1912345678
                                </a>
                            </li>

                            <li className="flex items-start gap-3">
                                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Dhaka, Bangladesh
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col items-center justify-between gap-3 border-t border-border/70 py-6 text-center sm:flex-row sm:text-left">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} WedPlan. All rights reserved.
                    </p>

                    <p className="text-xs text-muted-foreground">
                        Made with <span className="text-primary">♥</span> for your special day.
                    </p>
                </div>
            </div>
        </footer>
    );
}