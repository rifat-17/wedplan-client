
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




export type AdminService = {
    _id: string;
    vendorId: string;
    serviceName: string;
    category: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    status: "pending" | "approved" | "rejected";
    availability: "active" | "inactive";
    createdAt: string;
    vendor?: {
        name: string;
        email?: string;
        businessName?: string;
        image?: string;
    } | null;
};

export type AdminServicesResponse = {
    services: AdminService[];
    total: number;
};




export type AdminTransaction = {
    _id: string;
    vendorId: string;
    plan: "FREE" | "PREMIUM";
    amount: number;
    currency: string;
    status: "pending" | "paid" | "failed" | "cancelled";
    createdAt: string;
    vendor?: {
        _id: string;
        name: string;
        email?: string;
        image?: string;
        businessName?: string;
    } | null;
};

export type AdminTransactionsResponse = {
    transactions: AdminTransaction[];
    total: number;
};