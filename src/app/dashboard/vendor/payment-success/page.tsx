import Link from "next/link";
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type Props = {
    searchParams: Promise<{
        session_id?: string;
    }>;
};

export default async function PaymentSuccessPage({ searchParams }: Props) {
    await requireRole("VENDOR");

    const { session_id } = await searchParams;

    let paymentVerified = false;
    let message = "Unable to verify your payment.";

    if (session_id) {
        try {
            const token = await getTokenFromServer();

            if (token) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/vendor/subscription/verify-payment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            sessionId: session_id,
                        }),
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (response.ok && data.success) {
                    paymentVerified = true;
                    message = data.message;
                } else {
                    message = data.message || message;
                }
            }
        } catch (error) {
            console.error("Payment verification error:", error);
        }
    }

    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
                <div className={`mb-4 text-5xl ${paymentVerified ? "text-green-500" : "text-red-500"}`}>
                    {paymentVerified ? "✓" : "!"}
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    {paymentVerified
                        ? "Payment Successful!"
                        : "Payment Verification Failed"}
                </h1>

                <p className="mt-3 text-gray-500">
                    {paymentVerified
                        ? "Congratulations! Your WedPlan Premium plan is now active."
                        : message}
                </p>

                <Link
                    href="/dashboard/vendor"
                    className="mt-6 inline-block rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}