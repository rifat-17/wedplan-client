
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

type ImageUploadProps = {
    onUpload: (file: File | null) => void;
    initialImage?: string | null;
};

export default function ImageUpload({
    onUpload,
    initialImage,
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(
        initialImage ?? null
    );

    const handleImageChange = (file?: File) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB.");
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setPreview(previewUrl);
        onUpload(file);
    };

    const removeImage = () => {
        setPreview(null);
        onUpload(null);
    };

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium">
                Image
            </label>

            {preview ? (
                <div className="relative w-full max-w-sm">
                    <Image
                        src={preview}
                        alt="Service preview"
                        width={500}
                        height={300}
                        unoptimized
                        className="h-48 w-full rounded-lg object-cover"
                    />

                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute right-2 top-2 rounded-full bg-white p-2 shadow"
                    >
                        <X size={18} />
                    </button>
                </div>
            ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-gray-500 transition hover:border-pink-500 hover:bg-pink-50">
                    <ImagePlus size={32} />

                    <span className="text-sm font-medium">
                        Click to upload an image
                    </span>

                    <span className="text-xs">
                        PNG, JPG or WEBP (Maximum 5MB)
                    </span>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(event) =>
                            handleImageChange(event.target.files?.[0])
                        }
                    />
                </label>
            )}
        </div>
    );
}
