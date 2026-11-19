"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/lib/auth-guard";
import {
    LayoutDashboard,
    CalendarDays,
    BriefcaseBusiness,
    PlusCircle,
    ClipboardList,
    CreditCard,
    Users,
    Settings,
    LogOut,
} from "lucide-react";

type Props = {
    role: UserRole;
    name: string;
    email: string;
};

const navigation = {
    CUSTOMER: [
        { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
        { label: "My Bookings", href: "/dashboard/customer/my-bookings", icon: CalendarDays },
        { label: "Profile Settings", href: "/dashboard/customer/profile", icon: Settings },
    ],

    VENDOR: [
        { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
        { label: "My Services", href: "/dashboard/vendor/my-services", icon: BriefcaseBusiness },
        { label: "Add Service", href: "/dashboard/vendor/add-service", icon: PlusCircle },
        { label: "Booking Requests", href: "/dashboard/vendor/booking-requests", icon: ClipboardList },
        { label: "Subscription", href: "/dashboard/vendor/subscription", icon: CreditCard },
        { label: "Profile Settings", href: "/dashboard/vendor/profile", icon: Settings },
    ],

    ADMIN: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
        { label: "Manage Services", href: "/dashboard/admin/manage-services", icon: BriefcaseBusiness },
        { label: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
    ],
};

export default function DashboardSidebar({ role, name, email }: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed left-4 top-4 z-[60] rounded-lg border bg-white p-2 shadow-sm md:hidden"
                aria-label="Open dashboard menu"
            >
                <Menu size={22} />
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex min-h-screen w-64 flex-col border-r bg-white p-5 shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:sticky md:top-0 md:translate-x-0 md:shadow-none`}
            >
                {/* Brand and close button */}
                <div className="mb-10 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">
                        WedPlan
                    </Link>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden"
                        aria-label="Close dashboard menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* User information */}
                <div className="mb-8">
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-500">{email}</p>
                    <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs">
                        {role}
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    {navigation[role].map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${isActive
                                    ? "bg-pink-100 font-semibold text-pink-700"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>
        </>
    );
}