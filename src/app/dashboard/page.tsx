
import { getCurrentUser } from "@/lib/auth-guard";
import { redirect } from "next/navigation";


export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    if (user.isBlocked) {
        redirect("/sign-in?error=blocked");
    }

    switch (user.role) {
        case "CUSTOMER":
            redirect("/dashboard/customer");

        case "VENDOR":
            redirect("/dashboard/vendor");

        case "ADMIN":
            redirect("/dashboard/admin");

        default:
            redirect("/sign-in?error=invalid-role");
    }
}
