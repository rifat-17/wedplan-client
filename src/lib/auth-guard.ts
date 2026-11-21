
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
        query: {
            disableCookieCache: true,
        },
    });

    return session?.user ?? null;
};

// Require authentication
export const requireUser = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    if (user.isBlocked) {
        redirect("/sign-in?error=blocked");
    }

    if (!isValidRole(user.role)) {
        redirect("/sign-in?error=invalid-role");
    }

    return user;
};

// Require a specific role
export const requireRole = async (allowedRole: UserRole) => {
    const user = await requireUser();
    const role = user.role;

    if (!isValidRole(role)) {
        redirect("/sign-in?error=invalid-role");
    }

    if (role !== allowedRole) {
        redirect(`/dashboard/${role.toLowerCase()}`);
    }

    return user;
};
