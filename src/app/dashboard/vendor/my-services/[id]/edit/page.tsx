
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getVendorServices } from "@/lib/services-apis/service";
import { notFound } from "next/navigation";
import EditServiceForm from "@/components/dashboard/vendor/edit-service-form";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditServicePage({ params }: Props) {
    await requireRole("VENDOR");

    const { id } = await params;

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const { services } = await getVendorServices(token);

    const service = services.find((item) => item._id === id);

    if (!service) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Edit Service</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Update your wedding service information.
                </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <EditServiceForm service={service} />
            </div>
        </div>
    );
}
