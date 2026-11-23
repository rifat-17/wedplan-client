
import { requireRole } from "@/lib/auth-guard";

import RecoverPaymentButton from "@/components/dashboard/vendor/subscription/recover-payment-button";
import UpgradeButton from "@/components/dashboard/vendor/subscription/upgrade-button";


const plans = [
    {
        name: "Free Plan",
        price: 0,
        description: "Get started with the essential vendor tools.",
        features: [
            "Maximum 3 Active Services",
            "Basic Vendor Dashboard",
            "Booking Request Management",
        ],
    },
    {
        name: "Premium Plan",
        price: 89,
        description: "Unlock all features and grow your wedding business.",
        features: [
            "Unlimited Active Services",
            "Premium Vendor Badge",
            "Booking Request Management",
            "Basic Vendor Dashboard",
        ],
    },
];

const SubscriptionPage = async () => {
    const user = await requireRole("VENDOR");


    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Subscription Plans
                </h1>
                <p className="mt-2 text-gray-500">
                    Choose the right plan to grow your wedding business.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-2xl border p-6 shadow-sm ${plan.price > 0
                            ? "border-pink-500 bg-pink-50/30"
                            : "border-gray-200 bg-white"
                            }`}
                    >

                        {user.subscriptionPlan === (plan.price === 0 ? "FREE" : "PREMIUM") ? (
                            <span className="absolute right-5 top-5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                Current Plan
                            </span>
                        ) : plan.price > 0 ? (
                            <span className="absolute right-5 top-5 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                                Recommended
                            </span>
                        ) : null}

                        <h2 className="text-xl font-semibold text-gray-900">
                            {plan.name}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {plan.description}
                        </p>

                        <div className="mt-6">
                            <span className="text-4xl font-bold text-gray-900">
                                ${plan.price}
                            </span>
                            {plan.price > 0 && (
                                <span className="ml-2 text-sm text-gray-500">
                                    one-time payment
                                </span>
                            )}
                        </div>

                        <div className="my-6 border-t" />

                        <h3 className="mb-4 font-semibold text-gray-800">
                            What's included
                        </h3>

                        <ul className="space-y-3">
                            {plan.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-3 text-sm text-gray-600"
                                >
                                    <span className="text-green-600">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {plan.price > 0 && user.subscriptionPlan !== "PREMIUM" && (
                            <div className="mt-8">
                                <UpgradeButton />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <RecoverPaymentButton />
        </section>
    );
};

export default SubscriptionPage;