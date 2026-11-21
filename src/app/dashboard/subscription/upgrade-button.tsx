"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getTokenFromClient } from "@/lib/getTokenFromClient";

const UpgradeButton = () => {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const token = await getTokenFromClient();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/vendor/subscription/checkout`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to start checkout.");
            }

            if (!data.url) {
                throw new Error("Unable to start checkout.");
            }

            // Redirect to Stripe's hosted checkout page.
            window.location.href = data.url;
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Unable to start checkout."
            );
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleUpgrade}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Redirecting to payment..." : "Upgrade to Premium"}
        </button>
    );
};

export default UpgradeButton;
