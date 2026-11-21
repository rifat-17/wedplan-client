
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const RecoverPaymentButton = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleRecovery = async () => {
        try {
            setLoading(true);
            setMessage("");

            const token = await getTokenFromClient();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/vendor/subscription/recover-payment`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Payment recovery failed.");
            }

            setMessage(data.message);

            if (data.recoveredCount > 0) {
                router.refresh();
            }
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6">
            <button
                onClick={handleRecovery}
                disabled={loading}
                className="rounded-xl border border-pink-600 px-5 py-3 font-semibold text-pink-600 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Checking Payment..." : "Recover Previous Payment"}
            </button>

            {message && (
                <p className="mt-3 text-sm text-gray-600">
                    {message}
                </p>
            )}
        </div>
    );
};

export default RecoverPaymentButton;
