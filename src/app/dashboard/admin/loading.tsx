import StatsCardSkeleton from "@/components/dashboard/stats-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-48 max-w-full" />
                <Skeleton className="mt-2 h-4 w-72 max-w-full" />
            </div>

            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <StatsCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
