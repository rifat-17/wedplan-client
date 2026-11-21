import { Skeleton } from "@/components/ui/skeleton";

function ServiceCardSkeleton() {
    return (
        <div
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
            aria-hidden="true"
        >
            <Skeleton className="h-48 w-full rounded-none" />

            <div className="space-y-3 p-5">
                <div>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="mt-2 h-4 w-24" />
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />

                <div className="flex items-center justify-between border-t pt-3">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                    <Skeleton className="h-9 w-16 rounded-lg" />
                    <Skeleton className="h-9 w-20 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-40 max-w-full" />
                <Skeleton className="mt-2 h-4 w-64 max-w-full" />
            </div>

            {/* Service Count */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-2 h-9 w-16" />
            </div>

            {/* Services List */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <ServiceCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
