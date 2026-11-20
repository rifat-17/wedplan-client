
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    const [loading, setLoading] = useState(false);

    const handleApproval = async (action: "approve" | "reject") => {
        const confirmed = window.confirm(
            `Are you sure you want to ${action} this service?`
        );

        if (!confirmed) return;

        try {
            setLoading(true);

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
            setLoading(false);
        }
    };

    const handleAvailability = async () => {
        const nextAvailability =
            availability === "active" ? "inactive" : "active";

        try {
            setLoading(true);

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
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this service?"
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            const token = await getTokenFromClient();

            const result = await deleteAdminService(token, serviceId);

            toast.success(result.message || "Service deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            {status === "pending" && (
                <>
                    <button
                        type="button"
                        onClick={() => handleApproval("approve")}
                        disabled={loading}
                        className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                    >
                        Approve
                    </button>

                    <button
                        type="button"
                        onClick={() => handleApproval("reject")}
                        disabled={loading}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                    >
                        Reject
                    </button>
                </>
            )}

            {status === "approved" && (
                <button
                    type="button"
                    onClick={handleAvailability}
                    disabled={loading}
                    className="rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
                >
                    {availability === "active" ? "Deactivate" : "Activate"}
                </button>
            )}

            <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 disabled:opacity-50"
            >
                Delete
            </button>
        </div>
    );
}
