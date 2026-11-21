import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-40 max-w-full" />
                <Skeleton className="mt-2 h-4 w-80 max-w-full" />
                <Skeleton className="mt-3 h-4 w-32" />

                {/* Statistics */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border bg-white p-5"
                            aria-hidden="true"
                        >
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="mt-2 h-8 w-12" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border bg-white p-5 shadow-sm"
                        aria-hidden="true"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <Skeleton className="h-5 w-36" />
                            <Skeleton className="h-7 w-24 rounded-full" />
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="mb-5 flex flex-col gap-4 sm:flex-row">
                                <Skeleton className="h-36 w-full rounded-lg sm:w-48" />

                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-6 w-2/3" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-5 w-28" />
                                    <Skeleton className="h-4 w-36" />
                                </div>
                            </div>

                            <Skeleton className="h-16 w-full rounded-lg" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
