
import Link from "next/link";
import { getPublicServices } from "@/lib/services-apis/service";
import { Suspense } from "react";
import ServiceCategoryFilter from "@/components/services/service-category-filter";


type Props = {
    searchParams: Promise<{
        category?: string;
    }>;
};

export default async function BrowseServicePage({ searchParams }: Props) {

    const { category } = await searchParams;

    const { services, total } = await getPublicServices(category);

    return (
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Browse Wedding Services
                </h1>
                <p className="mt-2 text-gray-500">
                    Find the perfect services for your special day.
                </p>
                <p className="mt-3 text-sm text-gray-500">
                    {total} services available
                </p>
            </div>

            <Suspense fallback={<div className="h-10" />}>
                <ServiceCategoryFilter />
            </Suspense>

            {/* Services Grid */}
            {services.length === 0 ? (
                <div className="rounded-xl border p-10 text-center">
                    <h2 className="text-xl font-semibold">
                        No services available
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Please check back later.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                        >
                            <img
                                src={service.images[0]}
                                alt={service.serviceName}
                                className="h-52 w-full object-cover"
                            />

                            <div className="space-y-3 p-5">
                                <div>
                                    <p className="text-sm font-medium text-pink-600">
                                        {service.category}
                                    </p>

                                    <h2 className="mt-1 text-lg font-semibold">
                                        {service.serviceName}
                                    </h2>
                                </div>

                                <p className="line-clamp-2 text-sm text-gray-500">
                                    {service.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-gray-900">
                                        ৳{service.price.toLocaleString("en-BD")}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        {service.location}
                                    </span>
                                </div>

                                <Link
                                    href={`/services/${service._id}`}
                                    className="block rounded-lg bg-pink-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-pink-700"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
