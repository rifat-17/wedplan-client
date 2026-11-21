
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { deleteVendorService } from "@/lib/services-apis/service";

type Props = {
    serviceId: string;
};

export default function DeleteServiceButton({ serviceId }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (isDeleting) return;

        // const confirmed = window.confirm(
        //     "Are you sure you want to delete this service?"
        // );

        // if (!confirmed) return;

        try {
            setIsDeleting(true);

            const token = await getTokenFromClient();

            if (!token) {
                throw new Error("Authentication token not found.");
            }

            await deleteVendorService(token, serviceId);

            toast.success("Service deleted successfully.");
            router.refresh();

        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to delete service.";

            toast.error(message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isDeleting ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Trash2 size={16} />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
        </button>
    );
}
