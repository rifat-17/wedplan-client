
export type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN";

const DASHBOARD_PATHS: Record<UserRole, string> = {
  CUSTOMER: "/dashboard/customer",
  VENDOR: "/dashboard/vendor",
  ADMIN: "/dashboard/admin",
};

export function isUserRole(role: unknown): role is UserRole {
  return (
    role === "CUSTOMER" ||
    role === "VENDOR" ||
    role === "ADMIN"
  );
}

export function getDashboardPath(role: UserRole): string {
  return DASHBOARD_PATHS[role];
}
