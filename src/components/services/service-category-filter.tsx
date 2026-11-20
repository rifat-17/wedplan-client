
"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
    "All",
    "Photography",
    "Catering",
    "Decoration",
    "Venue",
    "Makeup",
    "Other",
];

export default function ServiceCategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get("category") || "All";

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        const query = params.toString();

        router.push(query ? `/services?${query}` : "/services");
    };

    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
                <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition ${selectedCategory === category
                            ? "border-pink-600 bg-pink-600 text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:border-pink-500 hover:text-pink-600"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
