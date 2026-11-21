"use client";

import { getTokenFromClient } from "@/lib/getTokenFromClient";



const UpgradeButton = () => {
    const handleUpgrade = async () => {
        try {
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

            window.location.href = data.url;
        } catch (error) {
            console.error("Upgrade error:", error);
        }
    };

    return (
        <button
            onClick={handleUpgrade}
            className="w-full rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700"
        >
            Upgrade to Premium
        </button>
    );
};

export default UpgradeButton;