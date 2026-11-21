import { Skeleton } from "@/components/ui/skeleton";

export default function StatsCardSkeleton() {
    return (
        <div
            className="rounded-xl border bg-white p-5 shadow-sm"
            aria-hidden="true"
        >
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-9 rounded-lg" />
            </div>

            <Skeleton className="mt-4 h-9 w-16" />

            <Skeleton className="mt-2 h-3 w-32" />
        </div>
    );
}
