import ServiceCardSkeleton from "@/components/services/service-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
            {/* Page Header */}
            <div>
                <Skeleton className="h-9 w-80 max-w-full" />
                <Skeleton className="mt-3 h-4 w-72 max-w-full" />
                <Skeleton className="mt-3 h-4 w-32" />
            </div>

            {/* Filters */}
            <Skeleton className="h-20 w-full rounded-xl" />

            {/* Services Grid */}
            <div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                aria-label="Loading services"
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <ServiceCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
