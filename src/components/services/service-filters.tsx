
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin } from "lucide-react";

export default function ServiceFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    const sort = searchParams.get("sort") || "";

    const hasFilters = Boolean(search || category || location || sort);

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        const query = params.toString();

        router.push(`/services${query ? `?${query}` : ""}`);
    };

    return (
        <div className="grid gap-3 rounded-xl border bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* Search by Service Name */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search services..."
                    defaultValue={search}
                    onChange={(event) =>
                        updateFilter("search", event.target.value)
                    }
                    className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-pink-500"
                />
            </div>

            {/* Category Filter */}
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

            {/* Location Filter */}
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search by location..."
                    defaultValue={location}
                    onChange={(event) =>
                        updateFilter("location", event.target.value)
                    }
                    className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-pink-500"
                />
            </div>

            {/* Sorting */}
            <select
                value={sort}
                onChange={(event) =>
                    updateFilter("sort", event.target.value)
                }
                className="rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500"
            >
                <option value="">Sort: Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
            </select>

            {/* Clear Filters */}
            <button
                type="button"
                onClick={() => router.push("/services")}
                disabled={!hasFilters}
                className="rounded-lg border border-pink-200 px-4 py-2.5 text-sm font-medium text-pink-600 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Clear Filters
            </button>
        </div>
    );
}
