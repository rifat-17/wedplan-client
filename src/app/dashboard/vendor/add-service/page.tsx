import AddServiceForm from "@/components/dashboard/vendor/add-service-form";
import { requireRole } from "@/lib/auth-guard";


export default async function AddServicePage() {
    await requireRole("VENDOR");

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold">
                    Add New Service
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Share your wedding service with customers.
                </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <AddServiceForm />
            </div>
        </div>
    );
}