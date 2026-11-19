import { requireRole } from "@/lib/auth-guard";

export default async function VendorDashboard() {
    await requireRole("ADMIN");

    return <h1 className="text-2xl font-bold">Admin Dashboard</h1>;
}