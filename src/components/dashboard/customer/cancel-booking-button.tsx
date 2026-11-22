
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { cancelCustomerBooking } from "@/lib/services-apis/booking";

type Props = {
    bookingId: string;
};

export default function CancelBookingButton({ bookingId }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        if (loading) return;

        // const confirmed = window.confirm(
        //     "Are you sure you want to cancel this booking?"
        // );

        // if (!confirmed) return;

        try {
            setLoading(true);

            const token = await getTokenFromClient();

            if (!token) {
                throw new Error("Please sign in again.");
            }

            const result = await cancelCustomerBooking(token, bookingId);

            toast.success(result.message);
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to cancel booking."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Cancelling..." : "Cancel Booking"}
        </button>
    );
}
