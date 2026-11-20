
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function UserFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`/dashboard/admin/users?${params.toString()}`);
    };

    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    defaultValue={search}
                    onChange={(event) =>
                        updateFilter("search", event.target.value)
                    }
                    className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-pink-500"
                />
            </div>

            {/* Role filter */}
            <select
                value={role}
                onChange={(event) =>
                    updateFilter("role", event.target.value)
                }
                className="rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500"
            >
                <option value="">All Roles</option>
                <option value="CUSTOMER">Customers</option>
                <option value="VENDOR">Vendors</option>
                <option value="ADMIN">Admins</option>
            </select>
        </div>
    );
}
