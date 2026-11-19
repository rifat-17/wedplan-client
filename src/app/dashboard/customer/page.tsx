import { requireRole } from "@/lib/auth-guard";

export default async function VendorDashboard() {
    await requireRole("CUSTOMER");

    return <h1 className="text-2xl font-bold">Customer Dashboard</h1>;
}