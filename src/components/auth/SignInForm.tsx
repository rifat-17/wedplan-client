
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function getDashboardPath(role: string) {
    switch (role) {
        case "ADMIN":
            return "/dashboard/admin/";
        case "VENDOR":
            return "/dashboard/vendor";
        case "CUSTOMER":
        default:
            return "/dashboard/customer";
    }
}


export default function SignInForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailSignIn = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setMessage("");
        setIsSubmitting(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: email.trim(),
                password,
            });

            if (error) {
                throw new Error(error.message || "Invalid email or password.");
            }

            if (!data?.user) {
                throw new Error("Unable to sign in. Please try again.");
            }

            setMessage("Signed in successfully!");

            const dashboard = getDashboardPath(
                data.user.role ?? "CUSTOMER"
            );

            router.replace(dashboard);
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setMessage("");
        setIsGoogleLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/auth/redirect",
            });

            if (error) {
                throw new Error(error.message || "Google sign-in failed.");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to sign in with Google."
            );
            setIsGoogleLoading(false);
        }
    };

    const isLoading = isSubmitting || isGoogleLoading;

    return (
        <div className="space-y-5">
            {/* Google sign-in */}
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#E3E5DF] px-4 py-3 text-sm font-medium text-[#252A26] transition hover:bg-[#FAF8F4] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isGoogleLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <svg
                        viewBox="0 0 48 48"
                        className="h-5 w-5"
                        aria-hidden="true"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                            transform="translate(0 5)"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.72 5.99c4.5-4.16 7.07-10.29 7.07-17.64Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z"
                            transform="translate(0 0)"
                        />
                        <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.72-5.99c-2.14 1.44-4.89 2.3-8.19 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                        />
                    </svg>
                )}

                Continue with Google
            </button>

            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E8E5DE]" />
                <span className="text-xs text-[#929891]">
                    OR CONTINUE WITH EMAIL
                </span>
                <div className="h-px flex-1 bg-[#E8E5DE]" />
            </div>

            {/* Email and password form */}
            <form onSubmit={handleEmailSignIn} className="space-y-5">
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
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border border-[#E3E5DF] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#526B5A] focus:ring-2 focus:ring-[#526B5A]/10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777E78]"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

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

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#526B5A] px-4 py-3 font-medium text-white transition hover:bg-[#405646] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting && (
                        <Loader2 size={18} className="animate-spin" />
                    )}
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
