import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-44 max-w-full" />
                <Skeleton className="mt-2 h-4 w-80 max-w-full" />
            </div>

            {/* User Profile */}
            <div className="rounded-xl border bg-white p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />

                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-56 max-w-full" />
                    </div>
                </div>
            </div>

            {/* Account Information */}
            <div className="rounded-xl border bg-white p-6">
                <Skeleton className="mb-5 h-6 w-48" />

                <div className="grid gap-5 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-5 w-40 max-w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
