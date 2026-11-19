
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN";

const isValidRole = (role: unknown): role is UserRole => {
    return ["CUSTOMER", "VENDOR", "ADMIN"].includes(role as string);
};

// Get authenticated user
export const getCurrentUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user ?? null;
};

// Require authentication
export const requireUser = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    if (user.isBlocked) {
        redirect("/login?error=blocked");
    }

    if (!isValidRole(user.role)) {
        redirect("/login?error=invalid-role");
    }

    return user;
};

// Require a specific role
export const requireRole = async (allowedRole: UserRole) => {
    const user = await requireUser();

    if (user.role !== allowedRole) {
        redirect(`/dashboard/${user.role.toLowerCase()}`);
    }

    return user;
};
