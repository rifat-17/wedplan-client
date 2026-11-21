
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Eye, EyeOff, ImagePlus, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type AccountRole = "CUSTOMER" | "VENDOR";

export default function SignUpForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<AccountRole>("CUSTOMER");

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();


    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5 MB.");
            return;
        }

        setError("");
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(null);
        setImagePreview("");
    };

    const uploadImage = async (): Promise<string | undefined> => {
        if (!imageFile) return undefined;

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        if (!apiKey) {
            throw new Error("Image upload configuration is missing.");
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error("Failed to upload profile image.");
        }

        return result.data.url;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!fullName.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            setError(
                "Password must contain at least one uppercase and one lowercase letter."
            );
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            setIsUploading(true);

            // Upload the optional profile image.
            const imageUrl = await uploadImage();

            // We'll connect Better Auth and secure role assignment
            // in the next step.
            const { data, error } = await authClient.signUp.email({
                name: fullName.trim(),
                email: email.trim(),
                password,
                image: imageUrl,
                role,
            });

            if (error) {
                throw new Error(error.message || "Registration failed.");
            }

            if (!data) {
                throw new Error("Unable to create your account.");
            }

            setMessage("Account created successfully!");

            const userRole = data.user.role;

            if (userRole === "VENDOR") {
                router.push("/vendor/dashboard");
            } else {
                router.push("/customer/dashboard");
            }
               
            router.refresh();

            setMessage(
                imageUrl
                    ? "Profile image uploaded successfully. Registration is the next step."
                    : "Form validation passed. Registration is the next step."
            );

            setMessage(
                "Form validation passed. Next, we'll connect account registration."
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
             console.log("error " , error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
                <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-[#252A26]"
                >
                    Full Name
                </label>

                <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#E3E5DF] px-4 py-3 text-sm outline-none transition focus:border-[#526B5A] focus:ring-2 focus:ring-[#526B5A]/10"
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#252A26]"
                >
                    Email Address
                </label>

                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#E3E5DF] px-4 py-3 text-sm outline-none transition focus:border-[#526B5A] focus:ring-2 focus:ring-[#526B5A]/10"
                />
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-[#252A26]"
                >
                    Password
                </label>

                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-lg border border-[#E3E5DF] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#526B5A] focus:ring-2 focus:ring-[#526B5A]/10"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777E78]"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <p className="mt-2 text-xs text-[#777E78]">
                    At least 6 characters, including one uppercase and one
                    lowercase letter.
                </p>
            </div>

            {/* Profile image */}
            <div>
                <label className="mb-2 block text-sm font-medium text-[#252A26]">
                    Profile Image <span className="text-[#929891]">(Optional)</span>
                </label>

                {imagePreview ? (
                    <div className="flex items-center gap-3 rounded-lg border border-[#E3E5DF] p-3">
                        <img
                            src={imagePreview}
                            alt="Profile preview"
                            className="h-14 w-14 rounded-full object-cover"
                        />

                        <span className="flex-1 truncate text-sm text-[#526B5A]">
                            {imageFile?.name}
                        </span>

                        <button
                            type="button"
                            onClick={removeImage}
                            aria-label="Remove profile image"
                            className="rounded-full p-2 text-[#777E78] hover:bg-[#F4F2ED]"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <label
                        htmlFor="profileImage"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#C9D2C8] bg-[#FAF8F4] px-4 py-5 text-sm text-[#526B5A] transition hover:bg-[#DCE5DA]/40"
                    >
                        <ImagePlus size={19} />
                        Upload profile image
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                )}

                <p className="mt-2 text-xs text-[#929891]">
                    JPG, PNG or WebP. Maximum 5 MB.
                </p>
            </div>

            {/* Account role */}
            <div>
                <p className="mb-2 text-sm font-medium text-[#252A26]">
                    I want to join as
                </p>

                <div className="grid grid-cols-2 gap-3">
                    {(["CUSTOMER", "VENDOR"] as const).map((item) => (
                        <label
                            key={item}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition ${role === item
                                ? "border-[#526B5A] bg-[#DCE5DA]/40 text-[#526B5A]"
                                : "border-[#E3E5DF] text-[#6B716C] hover:border-[#AAB9A9]"
                                }`}
                        >
                            <input
                                type="radio"
                                name="role"
                                value={item}
                                checked={role === item}
                                onChange={() => setRole(item)}
                                className="accent-[#526B5A]"
                            />

                            {item === "CUSTOMER" ? "Customer" : "Vendor"}
                        </label>
                    ))}
                </div>
            </div>

            {/* Feedback */}
            {error && (
                <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                >
                    {error}
                </p>
            )}

            {message && (
                <p
                    role="status"
                    className="rounded-lg bg-[#DCE5DA]/60 px-3 py-2 text-sm text-[#526B5A]"
                >
                    {message}
                </p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isUploading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#526B5A] px-4 py-3 font-medium text-white transition hover:bg-[#405646] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isUploading && <Loader2 size={18} className="animate-spin" />}
                {isUploading ? "Creating account..." : "Create Account"}
            </button>
        </form>
    );
}
