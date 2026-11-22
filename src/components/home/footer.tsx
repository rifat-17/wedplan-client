
import Link from "next/link";
import {
    MailIcon,
    MapPinIcon,
    PhoneIcon,
} from "lucide-react";

// Brand Logo
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

// Footer Navigation
const FOOTER_LINKS = [
    { label: "Home", href: "/" },
    { label: "Browse Services", href: "/services" },
];

export default function Footer() {
    return (
        <footer className="border-t border-border/70 bg-secondary/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="grid gap-10 py-12 md:grid-cols-3 lg:gap-16 lg:py-14">

                    {/* Brand & Description */}
                    <div>
                        <Brand />

                        <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                            Make your special day unforgettable with WedPlan.
                            Discover trusted wedding vendors, explore services,
                            and bring your dream wedding to life.
                        </p>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold text-foreground">
                            Explore
                        </h3>

                        <ul className="space-y-3">
                            {FOOTER_LINKS.map((link) => (
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
