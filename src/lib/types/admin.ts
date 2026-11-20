
export type AdminDashboardStats = {
    totalUsers: number;
    totalVendors: number;
    totalCustomers: number;
    totalServices: number;
    pendingServices: number;
    totalTransactions: number;
};



export type AdminUser = {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role: "CUSTOMER" | "VENDOR" | "ADMIN";
    isBlocked: boolean;
    businessName?: string;
    subscriptionPlan: "FREE" | "PREMIUM";
    subscriptionExpiresAt?: string | null;
    createdAt?: string;
};

export type AdminUsersResponse = {
    users: AdminUser[];
    total: number;
};
