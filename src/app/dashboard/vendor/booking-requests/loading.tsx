import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-52 max-w-full" />
                <Skeleton className="mt-2 h-4 w-80 max-w-full" />
                <Skeleton className="mt-3 h-4 w-44" />
            </div>

            {/* Booking Requests */}
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
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>

                        <div className="mt-5 flex gap-3">
                            <Skeleton className="h-9 w-24 rounded-lg" />
                            <Skeleton className="h-9 w-24 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
