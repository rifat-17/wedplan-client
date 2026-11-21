import {
    ShieldCheck,
    Wallet,
    CalendarCheck,
    HeartHandshake,
} from "lucide-react";

import { SectionHeading } from "./section-heading";

const benefits = [
    {
        icon: ShieldCheck,
        title: "Trusted Vendors",
        description:
            "Discover approved wedding professionals you can trust.",
    },
    {
        icon: Wallet,
        title: "Transparent Pricing",
        description:
            "Compare service prices and find options that fit your budget.",
    },
    {
        icon: CalendarCheck,
        title: "Easy Booking",
        description:
            "Explore services and manage your wedding bookings in one place.",
    },
    {
        icon: HeartHandshake,
        title: "Everything in One Place",
        description:
            "Find venues, photography, catering, decoration, and more.",
    },
];

export default function WhyChooseWedPlan() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <SectionHeading
                    eyebrow="Why WedPlan"
                    title="Everything You Need for Your Perfect Wedding"
                    description="We make wedding planning easier by connecting you with trusted professionals and essential services."
                />

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.title}
                                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-rose/40 hover:shadow-xl"
                            >
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-rose/10 text-rose transition-colors duration-300 group-hover:bg-rose group-hover:text-white">
                                    <Icon size={28} />
                                </div>

                                <h3 className="mb-3 text-lg font-semibold text-foreground">
                                    {benefit.title}
                                </h3>

                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}