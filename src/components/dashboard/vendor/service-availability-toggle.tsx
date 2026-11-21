
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { updateServiceAvailability } from "@/lib/services-apis/service";

type Props = {
    serviceId: string;
    availability: "active" | "inactive";
};

export default function ServiceAvailabilityToggle({
    serviceId,
    availability,
}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const token = await getTokenFromClient();

            if (!token) {
                throw new Error("Authentication token not found.");
            }

            const newAvailability =
                availability === "active" ? "inactive" : "active";

            await updateServiceAvailability(
                token,
                serviceId,
                newAvailability
            );

            toast.success(
                `Service is now ${newAvailability}.`
            );

            router.refresh();

        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update availability."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading
                ? "Updating..."
                : availability === "active"
                    ? "Deactivate"
                    : "Activate"}
        </button>
    );
}
