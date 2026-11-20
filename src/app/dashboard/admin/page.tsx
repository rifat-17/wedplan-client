
import { 
    Users, 
    Store, 
    UserRound, 
    BriefcaseBusiness, 
    Clock, 
    Receipt 
} from "lucide-react";

import { requireRole } from "@/lib/auth-guard";
import StatsCard from "@/components/dashboard/stats-card";
import { getAdminDashboardStats } from "@/lib/services-apis/admin-service";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export default async function AdminDashboard() {
    const user = await requireRole("ADMIN");

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const stats = await getAdminDashboardStats(token);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">
                    Welcome back, {user.name}!
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Here's what's happening across WedPlan.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    description="All registered users"
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
                    description="Services awaiting approval"
                />

                <StatsCard
                    title="Total Transactions"
                    value={stats.totalTransactions}
                    icon={Receipt}
                    description="Recorded payment transactions"
                />
            </div>
        </div>
    );
}
