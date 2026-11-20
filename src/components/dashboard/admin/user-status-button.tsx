
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { updateUserBlockStatus } from "@/lib/services-apis/admin-service";

type Props = {
    userId: string;
    isBlocked: boolean;
    role: string;
};

export default function UserStatusButton({
    userId,
    isBlocked,
    role,
}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async () => {
        const action = isBlocked ? "unblock" : "block";

        // const confirmed = window.confirm(
        //     `Are you sure you want to ${action} this user?`
        // );

        // if (!confirmed) return;

        try {
            setLoading(true);

            const token = await getTokenFromClient();

            const result = await updateUserBlockStatus(
                token,
                userId,
                action
            );

            toast.success(result.message || "User status updated successfully.");

            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    if (role === "ADMIN") {
        return <span className="text-xs text-gray-400">Protected</span>;
    }

    return (
        <button
            type="button"
            onClick={handleStatusChange}
            disabled={loading}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition disabled:opacity-50 ${isBlocked
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "bg-red-50 text-red-700 hover:bg-red-100"
                }`}
        >
            {loading
                ? "Please wait..."
                : isBlocked
                    ? "Unblock"
                    : "Block"}
        </button>
    );
}
