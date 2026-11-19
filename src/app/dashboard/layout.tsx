import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { requireUser } from "@/lib/auth-guard";


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requireUser();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar
                role={user.role}
                name={user.name}
                email={user.email}
            />

            <main className="min-w-0 flex-1 p-5 pt-16 md:p-8">
                {children}
            </main>
        </div>
    );
}