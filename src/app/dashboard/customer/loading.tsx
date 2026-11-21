import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-56 max-w-full" />
                <Skeleton className="mt-2 h-4 w-72 max-w-full" />
            </div>

            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border bg-white p-5 shadow-sm"
                        aria-hidden="true"
                    >
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-3 h-9 w-12" />
                        <Skeleton className="mt-4 h-6 w-28 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
