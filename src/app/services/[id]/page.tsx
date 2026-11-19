
import { requireUser } from "@/lib/auth-guard";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ServiceDetailsPage({ params }: Props) {
    const user = await requireUser();
    const { id } = await params;

    return (
        <section className="min-h-screen bg-[#FAF8F4] p-6">
            <h1 className="text-2xl font-semibold text-[#252A26]">
                Service Details
            </h1>
            <p className="mt-2 text-[#6B716C]">
                Service ID: {id}
            </p>
            <p className="mt-1 text-[#6B716C]">
                Welcome, {user.name}.
            </p>
        </section>
    );
}
