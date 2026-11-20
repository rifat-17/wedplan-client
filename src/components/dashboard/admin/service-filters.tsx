
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function ServiceFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`/dashboard/admin/manage-services?${params.toString()}`);
    };

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search service..."
                    defaultValue={search}
                    onChange={(event) =>
                        updateFilter("search", event.target.value)
                    }
                    className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-pink-500"
                />
            </div>

            {/* Category */}
            <select
                value={category}
                onChange={(event) =>
                    updateFilter("category", event.target.value)
                }
                className="rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500"
            >
                <option value="">All Categories</option>
                <option value="Photography">Photography</option>
                <option value="Catering">Catering</option>
                <option value="Decoration">Decoration</option>
                <option value="Venue">Venue</option>
                <option value="Makeup">Makeup</option>
                <option value="Other">Other</option>
            </select>

            {/* Approval Status */}
            <select
                value={status}
                onChange={(event) =>
                    updateFilter("status", event.target.value)
                }
                className="rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500"
            >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
    );
}
