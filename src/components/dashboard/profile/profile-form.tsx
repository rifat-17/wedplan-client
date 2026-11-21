"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import ImageUpload from "../image-upload";
import { uploadImage } from "@/lib/services/image-service";

type Props = {
    name: string;
    email: string;
    image?: string | null;
};

export default function ProfileForm({ name, email, image }: Props) {

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageKey, setImageKey] = useState(0);

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(name);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userName.trim()) {
            toast.error("Name cannot be empty.");
            return;
        }

        try {
            setLoading(true);

            const updateData: { name: string; image?: string } = {
                name: userName.trim(),
            };

            if (imageFile) {
                const imageUrl = await uploadImage(imageFile);
                updateData.image = imageUrl;
            }

            const { error } = await authClient.updateUser(updateData);

            if (error) {
                throw new Error(error.message);
            }

            toast.success("Profile updated successfully!");

            setImageFile(null);
            setImageKey((prev) => prev + 1);

            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 max-w-2xl space-y-5 rounded-xl border bg-white p-6 shadow-sm"
        >

            <ImageUpload
                key={imageKey}
                initialImage={image}
                onUpload={setImageFile}
            />
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                </label>

                <input
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border bg-gray-50 px-4 py-3 text-gray-500"
                />

                <p className="text-xs text-gray-500">
                    Email address cannot be changed here.
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700 disabled:opacity-60"
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}