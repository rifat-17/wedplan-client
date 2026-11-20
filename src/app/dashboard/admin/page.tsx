
import {
    Users,
    Store,
    UserRound,
    BriefcaseBusiness,
    Clock,
    CreditCard,
} from "lucide-react";

import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getAdminDashboardStats } from "@/lib/services-apis/admin-service";
import StatsCard from "@/components/dashboard/stats-card";

export default async function AdminDashboard() {
    await requireRole("ADMIN");

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const stats = await getAdminDashboardStats(token);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Admin Overview</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Monitor and manage the WedPlan platform.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    description="All registered accounts"
                />

                <StatsCard
                    title="Total Vendors"
                    value={stats.totalVendors}
                    icon={Store}
                    description="Registered vendor accounts"
                />

                <StatsCard
                    title="Total Customers"
                    value={stats.totalCustomers}
                    icon={UserRound}
                    description="Registered customer accounts"
                />

                <StatsCard
                    title="Total Services"
                    value={stats.totalServices}
                    icon={BriefcaseBusiness}
                    description="All submitted services"
                />

                <StatsCard
                    title="Pending Services"
                    value={stats.pendingServices}
                    icon={Clock}
                    description="Awaiting admin review"
                />

                <StatsCard
                    title="Total Transactions"
                    value={stats.totalTransactions}
                    icon={CreditCard}
                    description="Recorded payment transactions"
                />
            </div>
        </div>
    );
}
