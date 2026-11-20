import { AdminDashboardStats, AdminUser } from "../types/admin";
import {
    AdminUsersResponse,
} from "../types/admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAdminDashboardStats = async (
    token: string
): Promise<AdminDashboardStats> => {
    const response = await fetch(
        `${API_URL}/admin/dashboard-stats`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch admin dashboard statistics");
    }

    return response.json();
};



// Fetch all users
export const getAdminUsers = async (
    token: string,
    search = "",
    role = ""
): Promise<AdminUsersResponse> => {
    const params = new URLSearchParams();

    if (search) {
        params.set("search", search);
    }

    if (role) {
        params.set("role", role);
    }

    const response = await fetch(
        `${API_URL}/admin/users?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
};




export const updateUserBlockStatus = async (
    token: string,
    userId: string,
    action: "block" | "unblock"
) => {
    const response = await fetch(
        `${API_URL}/admin/users/${userId}/${action}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update user status");
    }

    return result;
};




export const getAdminUserById = async (
    token: string,
    userId: string
): Promise<{ user: AdminUser }> => {
    const response = await fetch(
        `${API_URL}/admin/users/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch user details");
    }

    return result;
};