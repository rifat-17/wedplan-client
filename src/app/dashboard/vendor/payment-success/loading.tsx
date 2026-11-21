import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                <Skeleton className="mx-auto mt-4 h-8 w-64 max-w-full" />
                <Skeleton className="mx-auto mt-3 h-4 w-80 max-w-full" />
                <Skeleton className="mx-auto mt-2 h-4 w-64 max-w-full" />
                <Skeleton className="mx-auto mt-6 h-12 w-48 rounded-xl" />
            </div>
        </div>
    );
}
