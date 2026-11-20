import { AdminDashboardStats } from "../types/admin";


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