import Link from "next/link";
import { ArrowUpIcon } from "lucide-react";

import { footerLinkGroups, socialLinks } from "@/data/home-data";

import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  YouTubeIcon,
} from "./social-icons";

const socialIcons = {
  Instagram: InstagramIcon,
  Pinterest: PinterestIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#22302a] text-[#eae5da]">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.85fr_1.25fr_0.85fr] lg:gap-10">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="WedPlan home"
              className="group inline-flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#22302a]"
            >
              <span
                aria-hidden="true"
                className="relative flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/5 transition-transform duration-300 group-hover:-rotate-3"
              >
                <span className="absolute size-4 -translate-x-[3px] rounded-full border border-white/70" />
                <span className="absolute size-4 translate-x-[3px] rounded-full border border-accent" />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
                Wed<span className="text-accent">Plan</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Thoughtfully curated wedding professionals, transparent pricing,
              and calm planning tools — so your day feels every bit as
              beautiful as you imagined it.
            </p>

            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`WedPlan on ${social.label}`}
                    className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors duration-300 hover:border-white/35 hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                  >
                    <Icon className="size-[15px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-[0.68rem] font-medium tracking-[0.2em] text-white/45 uppercase">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.85rem] text-white/65 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} WedPlan. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <p className="hidden sm:block">
              Made with care for unforgettable celebrations.
            </p>
            <Link
              href="#top"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[0.7rem] text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              Back to top
              <ArrowUpIcon className="size-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
