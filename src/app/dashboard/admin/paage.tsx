
import { requireRole } from "@/lib/auth-guard";

export default async function AdminDashboardPage() {
    const user = await requireRole("ADMIN");

    return (
        <section className="min-h-screen bg-[#FAF8F4] p-6">
            <h1 className="text-2xl font-semibold text-[#252A26]">
                Admin Dashboard
            </h1>
            <p className="mt-2 text-[#6B716C]">
                Welcome back, {user.name}.
            </p>
        </section>
    );
}
