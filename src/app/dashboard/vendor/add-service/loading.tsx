import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-3xl space-y-8">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-48 max-w-full" />
                <Skeleton className="mt-2 h-4 w-72 max-w-full" />
            </div>

            {/* Add Service Form */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-32 w-full rounded-lg" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>

                    <div className="space-y-3">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-48 w-full max-w-sm rounded-xl" />
                    </div>

                    <Skeleton className="h-12 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}
