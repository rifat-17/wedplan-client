export interface VendorDashboardStats {
    totalServices: number;
    activeServices: number;
    pendingRequests: number;
    acceptedBookings: number;
    subscriptionPlan: "FREE" | "PREMIUM";
}