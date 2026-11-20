
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { requireUser } from "@/lib/auth-guard";
import { Toaster } from "sonner";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requireUser();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidebarProvider>
                <DashboardSidebar
                    role={user.role ?? "CUSTOMER"}
                    name={user.name}
                    email={user.email}
                />

                <main className="min-w-0 flex-1 p-5 pt-16 md:p-8">
                    {children}
                </main>
            </SidebarProvider>

            <Toaster position="top-right" />
        </div>
    );
}
