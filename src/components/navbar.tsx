"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDownIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

// Only "/" exists today; the other destinations are planned pages.
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
] as const;

const ACCOUNT_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Profile Settings", href: "/settings/profile", icon: SettingsIcon },
] as const;

type NavbarUser = {
  name: string;
  email: string;
  image?: string | null;
};

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function UserAvatar({
  user,
  size = "default",
}: {
  user: NavbarUser;
  size?: "sm" | "default" | "lg";
}) {
  return (
    <Avatar size={size} className="border border-border/60 bg-secondary">
      {user.image ? <AvatarImage src={user.image} alt="" /> : null}
      <AvatarFallback className="bg-secondary font-medium text-primary">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}

function Brand() {
  return (
    <Link
      href="/"
      aria-label="WedPlan home"
      className="group flex shrink-0 items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Main"
      className="hidden flex-1 items-center justify-center gap-1 md:flex"
    >
      {NAV_LINKS.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-secondary text-primary"
                : "text-foreground/65 hover:bg-secondary/60 hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AuthButtons() {
  return (
    <div className="hidden items-center gap-1.5 md:flex">
      <Link
        href="/sign-in"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 rounded-full px-4 text-foreground/75 hover:bg-secondary/60 hover:text-foreground",
        )}
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          buttonVariants(),
          "h-9 rounded-full px-5 shadow-sm hover:bg-primary/90",
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}

function UserMenu({
  user,
  onSignOut,
}: {
  user: NavbarUser;
  onSignOut: () => Promise<void>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            aria-label={`Open account menu for ${user.name}`}
            className="group/account h-10 gap-2 rounded-full pl-1.5 pr-2.5 hover:bg-secondary/60 data-[popup-open]:bg-secondary/60"
          />
        }
      >
        <UserAvatar user={user} />
        <span className="hidden max-w-32 truncate text-sm font-medium lg:block">
          {user.name}
        </span>
        <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-data-[popup-open]/account:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-64">
        <div className="flex items-center gap-3 px-2 py-2">
          <UserAvatar user={user} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
          <DropdownMenuItem
            key={href}
            render={<Link href={href} />}
            className="gap-2 py-2"
          >
            <Icon />
            {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={onSignOut}
          className="gap-2 py-2"
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileMenu({
  pathname,
  user,
  isPending,
  onSignOut,
}: {
  pathname: string;
  user: NavbarUser | null;
  isPending: boolean;
  onSignOut: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Open navigation menu"
            className="rounded-full md:hidden"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(22rem,calc(100vw-1.5rem))] gap-0 bg-popover p-0"
      >
        <SheetHeader className="border-b border-border/70 px-5 py-4">
          <SheetTitle className="font-serif text-lg tracking-tight">
            Menu
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation and account options
          </SheetDescription>
        </SheetHeader>

        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
        >
          {NAV_LINKS.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-base font-medium transition-colors",
                  active
                    ? "bg-secondary text-primary"
                    : "text-foreground/70 hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border/70 p-4">
          {isPending ? (
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ) : user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/40 p-3">
                <UserAvatar user={user} size="lg" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary/60 hover:text-foreground"
                  >
                    <Icon className="size-4" />
                    {label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    void onSignOut();
                  }}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOutIcon className="size-4" />
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-10 w-full rounded-full",
                )}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants(), "h-10 w-full rounded-full")}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

    

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Brand />
        <DesktopNav pathname={pathname} />

        <div className="flex shrink-0 items-center gap-2">
          {isPending ? (
            <Skeleton className="hidden h-10 w-32 rounded-full md:block" />
          ) : user ? (
            <div className="hidden md:block">
              <UserMenu user={user} onSignOut={handleSignOut} />
            </div>
          ) : (
            <AuthButtons />
          )}

          <MobileMenu
            pathname={pathname}
            user={user}
            isPending={isPending}
            onSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
}
