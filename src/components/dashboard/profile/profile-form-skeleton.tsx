import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileFormSkeleton() {
    return (
        <div className="mt-6 max-w-2xl space-y-5 rounded-xl border bg-white p-6 shadow-sm">
            <div className="space-y-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-48 w-full max-w-sm rounded-xl" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-3 w-56 max-w-full" />
            </div>

            <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
    );
}
