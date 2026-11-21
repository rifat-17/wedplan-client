
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { updateBookingStatus } from "@/lib/services-apis/booking";

type Props = {
    bookingId: string;
};

export default function BookingAction({ bookingId }: Props) {
    const router = useRouter();
    const [loadingAction, setLoadingAction] = useState<
        "Accepted" | "Rejected" | null
    >(null);

    const isLoading = loadingAction !== null;

    const handleStatusUpdate = async (
        status: "Accepted" | "Rejected"
    ) => {
        if (isLoading) return;

        try {
            setLoadingAction(status);

            const token = await getTokenFromClient();

            if (!token) {
                throw new Error("Please sign in again.");
            }

            const result = await updateBookingStatus(
                token,
                bookingId,
                status
            );

            toast.success(result.message);
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update booking."
            );
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <div className="mt-5 flex gap-3">
            <button
                type="button"
                disabled={isLoading}
                onClick={() => handleStatusUpdate("Accepted")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loadingAction === "Accepted" && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {loadingAction === "Accepted" ? "Accepting..." : "Accept"}
            </button>

            <button
                type="button"
                disabled={isLoading}
                onClick={() => handleStatusUpdate("Rejected")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loadingAction === "Rejected" && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {loadingAction === "Rejected" ? "Rejecting..." : "Reject"}
            </button>
        </div>
    );
}
