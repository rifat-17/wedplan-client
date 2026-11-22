
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getTokenFromClient } from "@/lib/getTokenFromClient";
import {
    updateServiceApproval,
    updateServiceAvailability,
    deleteAdminService,
} from "@/lib/services-apis/admin-service";

type Props = {
    serviceId: string;
    status: "pending" | "approved" | "rejected";
    availability: "active" | "inactive";
};

export default function ServiceActions({
    serviceId,
    status,
    availability,
}: Props) {
    const router = useRouter();
    const [loadingAction, setLoadingAction] = useState<
        "approve" | "reject" | "availability" | "delete" | null
    >(null);

    const isLoading = loadingAction !== null;

    const handleApproval = async (action: "approve" | "reject") => {
        if (isLoading) return;

        // const confirmed = window.confirm(
        //     `Are you sure you want to ${action} this service?`
        // );

        // if (!confirmed) return;

        try {
            setLoadingAction(action);

            const token = await getTokenFromClient();

            const result = await updateServiceApproval(
                token,
                serviceId,
                action
            );

            toast.success(result.message || `Service ${action}d successfully`);
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoadingAction(null);
        }
    };

    const handleAvailability = async () => {
        if (isLoading) return;

        const nextAvailability =
            availability === "active" ? "inactive" : "active";

        try {
            setLoadingAction("availability");

            const token = await getTokenFromClient();

            const result = await updateServiceAvailability(
                token,
                serviceId,
                nextAvailability
            );

            toast.success(result.message || "Availability updated successfully");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoadingAction(null);
        }
    };

    const handleDelete = async () => {
        if (isLoading) return;

        // const confirmed = window.confirm(
        //     "Are you sure you want to permanently delete this service?"
        // );

        // if (!confirmed) return;

        try {
            setLoadingAction("delete");

            const token = await getTokenFromClient();

            const result = await deleteAdminService(token, serviceId);

            toast.success(result.message || "Service deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            {status === "pending" && (
                <>
                    <button
                        type="button"
                        onClick={() => handleApproval("approve")}
                        disabled={isLoading}
                        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loadingAction === "approve" && (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        )}
                        {loadingAction === "approve" ? "Approving..." : "Approve"}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleApproval("reject")}
                        disabled={isLoading}
                        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loadingAction === "reject" && (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        )}
                        {loadingAction === "reject" ? "Rejecting..." : "Reject"}
                    </button>
                </>
            )}

            {status === "approved" && (
                <button
                    type="button"
                    onClick={handleAvailability}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loadingAction === "availability" && (
                        <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                    {loadingAction === "availability"
                        ? "Updating..."
                        : availability === "active"
                            ? "Deactivate"
                            : "Activate"}
                </button>
            )}

            <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loadingAction === "delete" && (
                    <Loader2 className="h-3 w-3 animate-spin" />
                )}
                {loadingAction === "delete" ? "Deleting..." : "Delete"}
            </button>
        </div>
    );
}
