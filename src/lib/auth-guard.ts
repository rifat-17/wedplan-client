
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN";

export function getDashboardPath(role: UserRole) {
    switch (role) {
        case "VENDOR":
            return "/vendor/dashboard";
        case "ADMIN":
            return "/admin/dashboard";
        case "CUSTOMER":
        default:
            return "/customer/dashboard";
    }
}

export async function requireUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    if (session.user.isBlocked) {
        redirect("/sign-in?error=account-blocked");
    }

    return session.user;
}

export async function requireRole(requiredRole: UserRole) {
    const user = await requireUser();

    if (user.role !== requiredRole) {
        redirect(getDashboardPath(user.role as UserRole));
    }

    return user;
}
