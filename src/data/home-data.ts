// import type { LucideIcon } from "lucide-react";
// import {
//   BadgeCheckIcon,
//   CalendarCheckIcon,
//   CalendarHeartIcon,
//   HeartHandshakeIcon,
//   PartyPopperIcon,
//   ReceiptTextIcon,
//   SearchIcon,
//   ShieldCheckIcon,
// } from "lucide-react";

// export interface Vendor {
//   name: string;
//   avatar: string;
// }



// export interface Category {
//   slug: string;
//   name: string;
//   description: string;
//   image: string;
//   vendorCount: string;
// }

// export interface Benefit {
//   title: string;
//   description: string;
//   icon: LucideIcon;
// }

// export interface Step {
//   title: string;
//   description: string;
//   icon: LucideIcon;
// }

// export interface FooterLinkGroup {
//   title: string;
//   links: { label: string; href: string }[];
// }






// export const serviceCategoryMap: Record<string, string[]> = {
//   "photography-videography": ["Photography", "Videography"],
//   "wedding-venues": ["Wedding Venues"],
//   "decoration-florist": ["Decoration & Florist"],
//   "catering-services": ["Catering Services"],
//   "makeup-styling": ["Makeup & Styling"],
//   "wedding-fashion": ["Wedding Fashion"],
// };


// export const benefits: Benefit[] = [
//   {
//     title: "Verified Vendors",
//     description:
//       "Every professional is vetted for quality, reliability, and real reviews from couples who booked them.",
//     icon: BadgeCheckIcon,
//   },
//   {
//     title: "Easy Booking",
//     description:
//       "Check availability, message vendors, and reserve your date in a few simple steps — no endless email threads.",
//     icon: CalendarCheckIcon,
//   },
//   {
//     title: "Transparent Pricing",
//     description:
//       "Clear starting prices and package details up front, so you can plan your budget with confidence.",
//     icon: ReceiptTextIcon,
//   },
//   {
//     title: "Secure Payments",
//     description:
//       "Deposits and balances are handled through protected payments, with every step documented for you.",
//     icon: ShieldCheckIcon,
//   },
// ];

// export const steps: Step[] = [
//   {
//     title: "Explore Services",
//     description:
//       "Browse curated photographers, venues, florists, and more — filtered by style, location, and budget.",
//     icon: SearchIcon,
//   },
//   {
//     title: "Choose Your Vendor",
//     description:
//       "Compare portfolios, read verified reviews, and shortlist the team that fits your vision.",
//     icon: HeartHandshakeIcon,
//   },
//   {
//     title: "Book Your Service",
//     description:
//       "Confirm dates, packages, and pricing with transparent quotes and secure online payment.",
//     icon: CalendarHeartIcon,
//   },
//   {
//     title: "Celebrate Your Wedding",
//     description:
//       "Relax and enjoy the day while your trusted vendors bring every detail to life.",
//     icon: PartyPopperIcon,
//   },
// ];

// export const footerLinkGroups: FooterLinkGroup[] = [
//   {
//     title: "Explore",
//     links: [
//       { label: "Home", href: "/" },
//       { label: "Browse Services", href: "/services" },
//       { label: "Why WedPlan", href: "#why-wedplan" },
//       { label: "How It Works", href: "#how-it-works" },
//     ],
//   },
//   {
//     title: "Categories",
//     links: [
//       { label: "Photography & Videography", href: "/services?category=photography-videography" },
//       { label: "Wedding Venues", href: "/services?category=wedding-venues" },
//       { label: "Decoration & Florist", href: "/services?category=decoration-florist" },
//       { label: "Catering Services", href: "/services?category=catering-services" },
//       { label: "Makeup & Styling", href: "/services?category=makeup-styling" },
//       { label: "Wedding Fashion", href: "/services?category=wedding-fashion" },
//     ],
//   },
//   {
//     title: "Account",
//     links: [
//       { label: "Sign In", href: "/sign-in" },
//       { label: "Create Account", href: "/sign-up" },
//       { label: "Dashboard", href: "/dashboard/customer" },
//       { label: "Profile Settings", href: "/settings/profile" },
//     ],
//   },
// ];

// export const socialLinks = [
//   { label: "Instagram", href: "https://instagram.com" },
//   { label: "Pinterest", href: "https://pinterest.com" },
//   { label: "Facebook", href: "https://facebook.com" },
//   { label: "YouTube", href: "https://youtube.com" },
// ] as const;
