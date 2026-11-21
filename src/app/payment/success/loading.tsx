import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="mx-auto max-w-3xl space-y-4 p-10">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </section>
    );
}
