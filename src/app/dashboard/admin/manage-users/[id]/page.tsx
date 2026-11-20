
import { notFound } from "next/navigation";

import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getAdminUserById } from "@/lib/services-apis/admin-service";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function UserDetailsPage({ params }: Props) {
    await requireRole("ADMIN");

    const { id } = await params;

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    let user;

    try {
        const result = await getAdminUserById(token, id);
        user = result.user;
    } catch {
        notFound();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">User Details</h1>
                <p className="mt-1 text-sm text-gray-500">
                    View account information and subscription details.
                </p>
            </div>

            {/* User Profile */}
            <div className="rounded-xl border bg-white p-6">
                <div className="flex items-center gap-4">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="h-16 w-16 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-xl font-bold text-pink-600">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div>
                        <h2 className="text-xl font-semibold">
                            {user.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Account Information */}
            <div className="rounded-xl border bg-white p-6">
                <h2 className="mb-5 text-lg font-semibold">
                    Account Information
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="mt-1 font-medium">{user.role}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Account Status</p>
                        <p className="mt-1 font-medium">
                            {user.isBlocked ? "Blocked" : "Active"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Business Name</p>
                        <p className="mt-1 font-medium">
                            {user.businessName || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Subscription Plan
                        </p>
                        <p className="mt-1 font-medium">
                            {user.subscriptionPlan || "FREE"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Subscription Expires
                        </p>
                        <p className="mt-1 font-medium">
                            {user.subscriptionExpiresAt
                                ? new Date(
                                      user.subscriptionExpiresAt
                                  ).toLocaleDateString()
                                : "No expiry date"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">User ID</p>
                        <p className="mt-1 break-all font-medium">
                            {user._id}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
