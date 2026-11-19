
import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";


export default function SignUpPage() {
    return (
        <section className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#FAF8F4] px-4 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#526B5A]">
                        Welcome to WedPlan
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight text-[#252A26]">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-[#6B716C]">
                        Start planning beautiful weddings with us.
                    </p>
                </div>

                <div className="rounded-2xl border border-[#E8E5DE] bg-white p-6 shadow-sm sm:p-8">
                    <SignUpForm />

                    <p className="mt-6 text-center text-sm text-[#6B716C]">
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            className="font-semibold text-[#526B5A] hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
