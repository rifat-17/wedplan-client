
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function TransactionFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const plan = searchParams.get("plan") || "";

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        const query = params.toString();

        router.push(
            `/dashboard/admin/transactions${query ? `?${query}` : ""}`
        );
    };


    const clearFilters = () => {
        router.push("/dashboard/admin/transactions");
    };

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    updateFilter("search", String(formData.get("search") || ""));
                }}
                className="relative"
            >
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    name="search"
                    placeholder="Search vendor..."
                    defaultValue={search}
                    className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-pink-500"
                />
            </form>

            {/* Status */}
            <select
                value={status}
                onChange={(event) =>
                    updateFilter("status", event.target.value)
                }
                className="rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500"
            >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
            </select>

            {/* Plan */}
            <select
                value={plan}
                onChange={(event) =>
                    updateFilter("plan", event.target.value)
                }
                className="rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500"
            >
                <option value="">All Plans</option>
                <option value="FREE">Free</option>
                <option value="PREMIUM">Premium</option>
            </select>

            <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
                Clear Filters
            </button>
        </div>
    );
}
