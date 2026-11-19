"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
    serviceId: string;
    vendorId: string;
    currentUser?: {
        id: string;
        role: "customer" | "vendor" | "admin";
    } | null;
    isBookable: boolean;
}

export default function BookingButton({
    serviceId,
    vendorId,
    currentUser,
    isBookable,
}: Props) {
    const router = useRouter();

    const handleBooking = () => {
        if (!currentUser) {
            router.push(`/sign-in?callbackURL=/services/${serviceId}`);
            return;
        }

        if (currentUser.role === "admin") return;

        if (currentUser.role === "vendor") return;

        if (currentUser.id === vendorId) return;

        if (!isBookable) return;

        // Next step: submit booking request to backend.
        router.push(`/services/${serviceId}/book`);
    };

    const isDisabled =
        !isBookable ||
        currentUser?.role === "admin" ||
        (currentUser?.role === "vendor" &&
            currentUser.id === vendorId);

    return (
        <Button
            className="mt-6 w-full"
            disabled={isDisabled}
            onClick={handleBooking}
        >
            {!isBookable
                ? "Unavailable"
                : currentUser?.role === "admin"
                    ? "Booking Not Allowed"
                    : currentUser?.role === "vendor" &&
                        currentUser.id === vendorId
                        ? "Your Own Service"
                        : "Request Booking"}
        </Button>
    );
}
