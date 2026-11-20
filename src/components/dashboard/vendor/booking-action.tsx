
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { updateBookingStatus } from "@/lib/services-apis/booking";

type Props = {
    bookingId: string;
};

export default function BookingAction({ bookingId }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleStatusUpdate = async (
        status: "Accepted" | "Rejected"
    ) => {
        try {
            setLoading(true);

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
            setLoading(false);
        }
    };

    return (
        <div className="mt-5 flex gap-3">
            <button
                type="button"
                disabled={loading}
                onClick={() => handleStatusUpdate("Accepted")}
                className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
                Accept
            </button>

            <button
                type="button"
                disabled={loading}
                onClick={() => handleStatusUpdate("Rejected")}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
                Reject
            </button>
        </div>
    );
}
