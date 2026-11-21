import ProfileFormSkeleton from "@/components/dashboard/profile/profile-form-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="min-h-screen bg-[#FAF8F4] p-6">
            <div>
                <Skeleton className="h-8 w-52 max-w-full" />
                <Skeleton className="mt-2 h-4 w-64 max-w-full" />
            </div>

            <ProfileFormSkeleton />
        </section>
    );
}
