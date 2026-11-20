import { AdminDashboardStats, AdminServicesResponse, AdminTransactionsResponse, AdminUser } from "../types/admin";
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



// Fetch all services
export const getAdminServices = async (
    token: string,
    search = "",
    category = "",
    status = ""
): Promise<AdminServicesResponse> => {
    const params = new URLSearchParams();

    if (search) {
        params.set("search", search);
    }

    if (category) {
        params.set("category", category);
    }

    if (status) {
        params.set("status", status);
    }

    const response = await fetch(
        `${API_URL}/admin/services?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }

    return response.json();
};




// Approve or reject a service
export const updateServiceApproval = async (
    token: string,
    serviceId: string,
    action: "approve" | "reject"
) => {
    const response = await fetch(
        `${API_URL}/admin/services/${serviceId}/${action}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `Failed to ${action} service`);
    }

    return result;
};




// Activate or deactivate an approved service
export const updateServiceAvailability = async (
    token: string,
    serviceId: string,
    availability: "active" | "inactive"
) => {
    const response = await fetch(
        `${API_URL}/admin/services/${serviceId}/availability`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ availability }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update service availability");
    }

    return result;
};



// Delete a service
export const deleteAdminService = async (
    token: string,
    serviceId: string
) => {
    const response = await fetch(
        `${API_URL}/admin/services/${serviceId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to delete service");
    }

    return result;
};




export const getAdminTransactions = async (
    token: string,
    search = "",
    status = "",
    plan = ""
): Promise<AdminTransactionsResponse> => {
    const params = new URLSearchParams();

    if (search) {
        params.set("search", search);
    }

    if (status) {
        params.set("status", status);
    }

    if (plan) {
        params.set("plan", plan);
    }

    const response = await fetch(
        `${API_URL}/admin/transactions?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch transactions");
    }

    return response.json();
};