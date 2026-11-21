import StatsCardSkeleton from "@/components/dashboard/stats-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-64 max-w-full" />
                <Skeleton className="mt-2 h-4 w-72 max-w-full" />
            </div>

            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatsCardSkeleton key={index} />
                ))}
            </div>

            {/* Subscription */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-44" />
                        <Skeleton className="h-4 w-56 max-w-full" />
                    </div>

                    <Skeleton className="h-10 w-32 rounded-full" />
                </div>
            </div>
        </div>
    );
}
