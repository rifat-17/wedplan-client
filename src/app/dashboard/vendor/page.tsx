import {
    BriefcaseBusiness,
    CheckCircle,
    Clock,
    CalendarCheck,
} from "lucide-react";

import { requireRole } from "@/lib/auth-guard";
import StatsCard from "@/components/dashboard/stats-card";
import { getVendorDashboardStats } from "@/lib/services-apis/vendor-service";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export default async function VendorDashboard() {
    const user = await requireRole("VENDOR");

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const stats = await getVendorDashboardStats(token);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">
                    Welcome back, {user.name}!
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Here's what's happening with your business.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Total Services"
                    value={stats.totalServices}
                    icon={BriefcaseBusiness}
                    description="All your submitted services"
                />

                <StatsCard
                    title="Active Services"
                    value={stats.activeServices}
                    icon={CheckCircle}
                    description="Approved and active services"
                />

                <StatsCard
                    title="Pending Requests"
                    value={stats.pendingRequests}
                    icon={Clock}
                    description="Booking requests awaiting action"
                />

                <StatsCard
                    title="Accepted Bookings"
                    value={stats.acceptedBookings}
                    icon={CalendarCheck}
                    description="Your confirmed bookings"
                />
            </div>

            {/* Subscription */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Current Subscription
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your WedPlan subscription.
                        </p>
                    </div>

                    <span
                        className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${user.subscriptionPlan === "PREMIUM"
                                ? "bg-pink-50 text-pink-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {user.subscriptionPlan || "FREE"} PLAN
                    </span>
                </div>
            </div>
        </div>
    );
}