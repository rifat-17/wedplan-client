
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getAdminUsers } from "@/lib/services-apis/admin-service";
import UserFilters from "@/components/dashboard/admin/user-filters";
import UserStatusButton from "@/components/dashboard/admin/user-status-button";
import Link from "next/link";

type Props = {
    searchParams: Promise<{
        search?: string;
        role?: string;
    }>;
};

export default async function ManageUsersPage({ searchParams }: Props) {
    await requireRole("ADMIN");

    const { search = "", role = "" } = await searchParams;

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const { users, total } = await getAdminUsers(token, search, role);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Manage Users</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage all registered customers and vendors.
                </p>
            </div>

            <div className="rounded-xl border bg-white p-5">
                <p className="text-sm text-gray-500">Total Users</p>
                <h2 className="mt-2 text-3xl font-bold">{total}</h2>
            </div>

            {/* Search and role filters */}
            <UserFilters />

            {/* Users table */}
            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Business</th>
                            <th className="p-4">Subscription</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="p-4">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-gray-500">{user.email}</p>
                                </td>
                                <td className="p-4">{user.role}</td>
                                <td className="p-4">
                                    {user.businessName || "—"}
                                </td>
                                <td className="p-4">
                                    {user.subscriptionPlan || "FREE"}
                                </td>
                                <td className="p-4">
                                    {user.isBlocked ? "Blocked" : "Active"}
                                </td>
                                <td className="flex items-center gap-2 p-4">
                                    <Link
                                        href={`/dashboard/admin/manage-users/${user._id}`}
                                        className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                                    >
                                        View
                                    </Link>

                                    <UserStatusButton
                                        userId={user._id}
                                        isBlocked={user.isBlocked}
                                        role={user.role}
                                    />
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
