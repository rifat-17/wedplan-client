import { VendorDashboardStats } from "../types/vendor";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const getVendorDashboardStats = async (
    token: string
): Promise<VendorDashboardStats> => {
    const response = await fetch(
        `${API_URL}/vendor/dashboard-stats`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard statistics");
    }

    return response.json();
};