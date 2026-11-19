import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  BadgeCheckIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Service } from "@/data/home-data";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "group/card relative h-full gap-0 overflow-hidden rounded-2xl border-0 p-0 shadow-sm ring-1 ring-border/80 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10 focus-within:ring-2 focus-within:ring-primary/40",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.name} — ${service.category}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70"
        />

        <Badge
          variant="secondary"
          className="absolute top-3 left-3 h-6 max-w-[calc(100%-5.5rem)] truncate border border-white/50 bg-background/92 px-2.5 text-[0.68rem] font-medium tracking-[0.08em] text-foreground/80 uppercase shadow-sm backdrop-blur"
        >
          {service.category}
        </Badge>

        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-foreground/55 px-2 py-1 text-[0.7rem] font-medium text-white backdrop-blur-sm">
          <StarIcon className="size-3 fill-[#f0c98c] text-[#f0c98c]" aria-hidden="true" />
          {service.rating.toFixed(1)}
          <span className="sr-only">out of 5</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.3rem] leading-snug font-medium tracking-tight text-foreground">
            <Link
              href={`/services/${service.slug}`}
              className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline focus-visible:decoration-primary/50 focus-visible:underline-offset-4"
            >
              {service.name}
            </Link>
          </h3>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-muted-foreground">
          <MapPinIcon className="size-3.5 shrink-0 text-primary/70" aria-hidden="true" />
          {service.location}
        </p>

        <div className="mt-4 flex items-center gap-2.5">
          <span className="relative size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
            <Image
              src={service.vendor.avatar}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[0.82rem] font-medium text-foreground">
              {service.vendor.name}
            </span>
            <span className="flex items-center gap-1 text-[0.68rem] text-muted-foreground">
              <BadgeCheckIcon className="size-3 text-primary" aria-hidden="true" />
              Verified vendor
            </span>
          </span>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-border/70 pt-4">
            <div>
              <p className="text-[0.62rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Starting at
              </p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
                {service.startingPrice}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 pb-0.5 text-[0.8rem] font-medium text-rose transition-colors group-hover/card:text-rose/80">
              View Details
              <ArrowUpRightIcon
                className="size-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
