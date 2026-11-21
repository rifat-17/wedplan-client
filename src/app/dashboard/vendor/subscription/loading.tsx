import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="space-y-6">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-56 max-w-full" />
                <Skeleton className="mt-2 h-4 w-80 max-w-full" />
            </div>

            {/* Plans */}
            <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl border bg-white p-6 shadow-sm"
                        aria-hidden="true"
                    >
                        <Skeleton className="absolute right-5 top-5 h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="mt-2 h-4 w-3/4" />
                        <Skeleton className="mt-6 h-10 w-24" />

                        <div className="my-6 border-t" />

                        <Skeleton className="mb-4 h-5 w-32" />

                        <div className="space-y-3">
                            {Array.from({ length: 4 }).map((_, itemIndex) => (
                                <Skeleton
                                    key={itemIndex}
                                    className="h-4 w-full max-w-[16rem]"
                                />
                            ))}
                        </div>

                        {index === 1 && (
                            <Skeleton className="mt-8 h-12 w-full rounded-xl" />
                        )}
                    </div>
                ))}
            </div>

            <Skeleton className="h-12 w-56 rounded-xl" />
        </section>
    );
}
