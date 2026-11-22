
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { UserRound, Mail, ShieldCheck, CalendarDays, CircleCheck, CircleX } from "lucide-react";


import { authClient } from "@/lib/auth-client";
import { AdminProfile } from "@/lib/types/admin";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { getAdminProfile } from "@/lib/services-apis/admin-service";

const AdminProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();

    const [admin, setAdmin] = useState<AdminProfile | null>(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const loading = isPending || (!!session && profileLoading);

    useEffect(() => {
        if (isPending || !session) return;

        let isMounted = true;

        const fetchProfile = async () => {
            try {
                const token = await getTokenFromClient();
                const result = await getAdminProfile(token);

                if (isMounted) {
                    setAdmin(result.admin);
                }
            } catch (error) {
                if (isMounted) {
                    toast.error(
                        error instanceof Error
                            ? error.message
                            : "Failed to load admin profile"
                    );
                }
            } finally {
                if (isMounted) {
                    setProfileLoading(false);
                }
            }
        };

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, [session, isPending]);

    if (isPending || loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
                    <p className="mt-3 text-sm text-gray-500">
                        Loading admin profile...
                    </p>
                </div>
            </div>
        );
    }

    if (!admin) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="rounded-xl border bg-white p-8 text-center">
                    <UserRound className="mx-auto h-10 w-10 text-gray-400" />
                    <h2 className="mt-3 text-lg font-semibold text-gray-800">
                        Profile unavailable
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        We couldn't load your profile information.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    My Profile
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage and view your administrator account information.
                </p>
            </div>

            {/* Profile Overview */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="h-32 bg-gradient-to-r from-primary/90 to-primary/50" />

                <div className="px-6 pb-6">
                    <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
                        {/* Profile Image */}
                        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-sm">
                            {admin.image ? (
                                <Image
                                    src={admin.image}
                                    alt={admin.name}
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-gray-500">
                                    {admin.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>

                        {/* Admin Information */}
                        <div className="flex-1 pt-2">
                            <h2 className="text-xl font-bold text-gray-900">
                                {admin.name}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {admin.email}
                            </p>
                        </div>

                        {/* Role Badge */}
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                            <ShieldCheck size={16} />
                            Administrator
                        </span>
                    </div>
                </div>
            </div>

            {/* Account Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Account Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Your administrator account details.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Full Name */}
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-gray-100 p-3">
                            <UserRound size={20} className="text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {admin.name}
                            </p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-gray-100 p-3">
                            <Mail size={20} className="text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="mt-1 break-all font-medium text-gray-900">
                                {admin.email}
                            </p>
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-gray-100 p-3">
                            <ShieldCheck size={20} className="text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Account Role</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {admin.role}
                            </p>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-gray-100 p-3">
                            {admin.isBlocked ? (
                                <CircleX size={20} className="text-red-500" />
                            ) : (
                                <CircleCheck size={20} className="text-green-600" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Account Status</p>
                            <p className={`mt-1 font-medium ${admin.isBlocked ? "text-red-600" : "text-green-600"}`}>
                                {admin.isBlocked ? "Blocked" : "Active"}
                            </p>
                        </div>
                    </div>

                    {/* Joined Date */}
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-gray-100 p-3">
                            <CalendarDays size={20} className="text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {admin.createdAt
                                    ? new Date(admin.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )
                                    : "Not available"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;
