import type { LucideIcon } from "lucide-react";
import {
  BadgeCheckIcon,
  CalendarCheckIcon,
  CalendarHeartIcon,
  HeartHandshakeIcon,
  PartyPopperIcon,
  ReceiptTextIcon,
  SearchIcon,
  ShieldCheckIcon,
} from "lucide-react";

export interface Vendor {
  name: string;
  avatar: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  startingPrice: string;
  location: string;
  image: string;
  vendor: Vendor;
  rating: number;
  reviewCount: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  vendorCount: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const featuredServices: Service[] = [
  {
    slug: "golden-hour-photography",
    name: "Golden Hour Wedding Photography",
    category: "Photography",
    startingPrice: "$1,850",
    location: "Napa Valley, CA",
    image: "/images/services/photography.jpg",
    vendor: { name: "Elena Rossi", avatar: "/images/vendors/elena.jpg" },
    rating: 4.9,
    reviewCount: 128,
  },
  {
    slug: "the-vineyard-estate",
    name: "The Vineyard Estate",
    category: "Wedding Venues",
    startingPrice: "$4,200",
    location: "Sonoma, CA",
    image: "/images/services/venue.jpg",
    vendor: { name: "Marcus Bell", avatar: "/images/vendors/marcus.jpg" },
    rating: 4.8,
    reviewCount: 94,
  },
  {
    slug: "wildflower-floral-studio",
    name: "Wildflower Floral Studio",
    category: "Decoration & Florist",
    startingPrice: "$980",
    location: "Portland, OR",
    image: "/images/services/florals.jpg",
    vendor: { name: "Sofia Marin", avatar: "/images/vendors/sofia.jpg" },
    rating: 5,
    reviewCount: 76,
  },
  {
    slug: "season-and-thyme-catering",
    name: "Season & Thyme Catering",
    category: "Catering Services",
    startingPrice: "$68 / guest",
    location: "Charleston, SC",
    image: "/images/services/catering.jpg",
    vendor: { name: "Daniel Okafor", avatar: "/images/vendors/daniel.jpg" },
    rating: 4.9,
    reviewCount: 210,
  },
  {
    slug: "luminous-bridal-studio",
    name: "Luminous Bridal Studio",
    category: "Makeup & Styling",
    startingPrice: "$450",
    location: "Austin, TX",
    image: "/images/services/makeup.jpg",
    vendor: { name: "Amara Lewis", avatar: "/images/vendors/amara.jpg" },
    rating: 4.9,
    reviewCount: 163,
  },
  {
    slug: "ever-after-films",
    name: "Ever After Films",
    category: "Videography",
    startingPrice: "$2,300",
    location: "Brooklyn, NY",
    image: "/images/services/videography.jpg",
    vendor: { name: "Noah Kessler", avatar: "/images/vendors/noah.jpg" },
    rating: 4.8,
    reviewCount: 87,
  },
];

export const categories: Category[] = [
  {
    slug: "photography-videography",
    name: "Photography & Videography",
    description: "Cinematic storytelling for every moment of your day.",
    image: "/images/categories/photography.jpg",
    vendorCount: "320+ vendors",
  },
  {
    slug: "wedding-venues",
    name: "Wedding Venues",
    description: "Vineyards, ballrooms, and garden escapes that feel like you.",
    image: "/images/categories/venues.jpg",
    vendorCount: "180+ venues",
  },
  {
    slug: "decoration-florist",
    name: "Decoration & Florist",
    description: "Floral artistry and styling that sets the scene.",
    image: "/images/categories/decor.jpg",
    vendorCount: "240+ studios",
  },
  {
    slug: "catering-services",
    name: "Catering Services",
    description: "Menus your guests will talk about for years.",
    image: "/images/categories/catering.jpg",
    vendorCount: "150+ caterers",
  },
  {
    slug: "makeup-styling",
    name: "Makeup & Styling",
    description: "Soft, radiant looks designed to last all night.",
    image: "/images/categories/makeup.jpg",
    vendorCount: "190+ artists",
  },
  {
    slug: "wedding-fashion",
    name: "Wedding Fashion",
    description: "Gowns, suits, and finishing touches for the big day.",
    image: "/images/categories/fashion.jpg",
    vendorCount: "110+ boutiques",
  },
];


export const serviceCategoryMap: Record<string, string[]> = {
  "photography-videography": ["Photography", "Videography"],
  "wedding-venues": ["Wedding Venues"],
  "decoration-florist": ["Decoration & Florist"],
  "catering-services": ["Catering Services"],
  "makeup-styling": ["Makeup & Styling"],
  "wedding-fashion": ["Wedding Fashion"],
};


export const benefits: Benefit[] = [
  {
    title: "Verified Vendors",
    description:
      "Every professional is vetted for quality, reliability, and real reviews from couples who booked them.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Easy Booking",
    description:
      "Check availability, message vendors, and reserve your date in a few simple steps — no endless email threads.",
    icon: CalendarCheckIcon,
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear starting prices and package details up front, so you can plan your budget with confidence.",
    icon: ReceiptTextIcon,
  },
  {
    title: "Secure Payments",
    description:
      "Deposits and balances are handled through protected payments, with every step documented for you.",
    icon: ShieldCheckIcon,
  },
];

export const steps: Step[] = [
  {
    title: "Explore Services",
    description:
      "Browse curated photographers, venues, florists, and more — filtered by style, location, and budget.",
    icon: SearchIcon,
  },
  {
    title: "Choose Your Vendor",
    description:
      "Compare portfolios, read verified reviews, and shortlist the team that fits your vision.",
    icon: HeartHandshakeIcon,
  },
  {
    title: "Book Your Service",
    description:
      "Confirm dates, packages, and pricing with transparent quotes and secure online payment.",
    icon: CalendarHeartIcon,
  },
  {
    title: "Celebrate Your Wedding",
    description:
      "Relax and enjoy the day while your trusted vendors bring every detail to life.",
    icon: PartyPopperIcon,
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Browse Services", href: "/services" },
      { label: "Why WedPlan", href: "#why-wedplan" },
      { label: "How It Works", href: "#how-it-works" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Photography & Videography", href: "/services?category=photography-videography" },
      { label: "Wedding Venues", href: "/services?category=wedding-venues" },
      { label: "Decoration & Florist", href: "/services?category=decoration-florist" },
      { label: "Catering Services", href: "/services?category=catering-services" },
      { label: "Makeup & Styling", href: "/services?category=makeup-styling" },
      { label: "Wedding Fashion", href: "/services?category=wedding-fashion" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", href: "/sign-in" },
      { label: "Create Account", href: "/sign-up" },
      { label: "Dashboard", href: "/dashboard/customer" },
      { label: "Profile Settings", href: "/settings/profile" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;
