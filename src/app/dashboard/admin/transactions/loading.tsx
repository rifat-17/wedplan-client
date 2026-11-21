import TableSkeleton from "@/components/dashboard/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-44 max-w-full" />
                <Skeleton className="mt-2 h-4 w-80 max-w-full" />
            </div>

            {/* Total Transactions */}
            <div className="rounded-xl border bg-white p-5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="mt-2 h-9 w-16" />
            </div>

            {/* Filters */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
            </div>

            {/* Transactions Table */}
            <TableSkeleton columns={5} />
        </div>
    );
}
