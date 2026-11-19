"use client";

import { useState, type FormEvent } from "react";
import ImageUpload from "@/components/dashboard/image-upload";

import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { createService } from "@/lib/services-apis/service";
import { uploadImage } from "@/lib/services/image-service";


export default function AddServiceForm() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageKey, setImageKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!imageFile) {
            setError("Please upload a service image.");
            return;
        }

        const form = event.currentTarget;

        try {
            setLoading(true);

            const formData = new FormData(event.currentTarget);

            // Upload the image to ImgBB first.
            const imageUrl = await uploadImage(imageFile);

            // Get the authenticated vendor's JWT.
            const token = await getTokenFromClient();

            // Send service information to Express.
            await createService(token, {
                serviceName: formData.get("serviceName") as string,
                category: formData.get("category") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")),
                location: formData.get("location") as string,
                images: [imageUrl],
            });

            setSuccess("Your service has been submitted successfully!");
            form.reset();
            setImageFile(null);
            setImageKey((previous) => previous + 1);

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
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
                    placeholder="e.g. Wedding Photography"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Service Category</label>
                <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                >
                    <option value="" disabled>Select a category</option>
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
                    placeholder="Describe your service..."
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
                    placeholder="e.g. 25000"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input
                    name="location"
                    required
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                />
            </div>

            <ImageUpload
                key={imageKey}
                onUpload={setImageFile}
            />

            {error && (
                <p role="alert" className="text-sm text-red-600">
                    {error}
                </p>
            )}

            {success && (
                <p role="status" className="text-sm text-green-600">
                    {success}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Submitting..." : "Submit Service"}
            </button>
        </form>
    );
}