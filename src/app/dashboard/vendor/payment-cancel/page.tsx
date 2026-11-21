import Link from "next/link";

export default function PaymentCancelPage() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
                <div className="mb-4 text-5xl text-red-500">
                    ×
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Payment Cancelled
                </h1>

                <p className="mt-3 text-gray-500">
                    Your payment was not completed.
                    You can try upgrading to Premium whenever you're ready.
                </p>

                <Link
                    href="/dashboard/vendor/subscription"
                    className="mt-6 inline-block rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
                >
                    Back to Subscription
                </Link>
            </div>
        </div>
    );
}