import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid gap-10 md:grid-cols-2">
                <Skeleton className="h-[400px] w-full rounded-xl" />

                <div className="space-y-5">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-9 w-3/4" />

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>

                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>

            {/* Booking Form */}
            <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="mt-3 h-4 w-72 max-w-full" />

                <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                    </div>

                    <Skeleton className="h-12 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}
