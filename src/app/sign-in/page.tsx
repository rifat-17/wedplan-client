
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";


export const metadata = {
    title: "Sign In | WedPlan",
    description: "Sign in to your WedPlan account.",
};

export default function SignInPage() {
    return (
        <section className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#FAF8F4] px-4 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#526B5A]">
                        Welcome Back
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight text-[#252A26]">
                        Sign in to WedPlan
                    </h1>

                    <p className="mt-2 text-sm text-[#6B716C]">
                        Your wedding planning journey continues here.
                    </p>
                </div>

                <div className="rounded-2xl border border-[#E8E5DE] bg-white p-6 shadow-sm sm:p-8">
                    <SignInForm />

                    <p className="mt-6 text-center text-sm text-[#6B716C]">
                        Don't have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-semibold text-[#526B5A] hover:underline"
                        >
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
