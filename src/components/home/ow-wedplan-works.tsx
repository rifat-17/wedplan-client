import {
    Search,
    Scale,
    CalendarCheck,
    Heart,
} from "lucide-react";

import { SectionHeading } from "./section-heading";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Explore Services",
        description:
            "Discover wedding services across different categories.",
    },
    {
        number: "02",
        icon: Scale,
        title: "Compare Vendors",
        description:
            "Compare prices, locations, and service details.",
    },
    {
        number: "03",
        icon: CalendarCheck,
        title: "Book Your Service",
        description:
            "Send booking requests to your preferred vendors.",
    },
    {
        number: "04",
        icon: Heart,
        title: "Celebrate Your Day",
        description:
            "Get ready to enjoy your special wedding day.",
    },
];

export default function HowWedPlanWorks() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <SectionHeading
                    eyebrow="Simple Process"
                    title="How WedPlan Works"
                    description="From discovering vendors to booking your favorite services, we make wedding planning simple."
                />
            </div>

            <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => {
                    const Icon = step.icon;

                    return (
                        <div
                            key={step.number}
                            className="group relative flex flex-col items-center text-center"
                        >
                            {/* Step Icon */}
                            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-rose/20 bg-rose/5 text-rose transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-rose group-hover:text-white group-hover:shadow-lg">
                                <Icon size={32} />

                                {/* Step Number */}
                                <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                                    {step.number}
                                </span>
                            </div>

                            {/* Step Information */}
                            <h3 className="mb-3 text-lg font-semibold text-foreground">
                                {step.title}
                            </h3>

                            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}