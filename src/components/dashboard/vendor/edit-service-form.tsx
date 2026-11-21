
"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/dashboard/image-upload";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { updateVendorService, type VendorService } from "@/lib/services-apis/service";
import { uploadImage } from "@/lib/services/image-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
    service: VendorService;
};

export default function EditServiceForm({ service }: Props) {
    const router = useRouter();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageKey, setImageKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");

        try {
            setLoading(true);

            const formData = new FormData(event.currentTarget);

            // Keep the existing image unless a new one is uploaded.
            let imageUrl = service.images[0];

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const token = await getTokenFromClient();

            if (!token) {
                throw new Error("Authentication token not found.");
            }

            await updateVendorService(token, service._id, {
                serviceName: formData.get("serviceName") as string,
                category: formData.get("category") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")),
                location: formData.get("location") as string,
                images: [imageUrl],
            });

            toast.success("Service updated successfully!");

            router.push("/dashboard/vendor/my-services");
            router.refresh();

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update service."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-medium">Service Name</label>
                <input
                    name="serviceName"
                    required
                    defaultValue={service.serviceName}
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Service Category</label>
                <select
                    name="category"
                    required
                    defaultValue={service.category}
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                >
                    <option value="Photography">Photography</option>
                    <option value="Catering">Catering</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Venue">Venue</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    required
                    rows={5}
                    defaultValue={service.description}
                    className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Price (BDT)</label>
                <input
                    name="price"
                    type="number"
                    required
                    min="1"
                    step="1"
                    defaultValue={service.price}
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input
                    name="location"
                    required
                    defaultValue={service.location}
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                />
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium">Current Service Image</label>
                <img
                    src={service.images[0]}
                    alt={service.serviceName}
                    className="h-48 w-full rounded-lg object-cover"
                />

                <p className="text-sm text-gray-500">
                    Upload a new image only if you want to replace the current one.
                </p>

                <ImageUpload
                    key={imageKey}
                    onUpload={setImageFile}
                />
            </div>

            {error && (
                <p role="alert" className="text-sm text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Updating..." : "Update Service"}
            </button>
        </form>
    );
}
