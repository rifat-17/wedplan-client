
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getAdminServices } from "@/lib/services-apis/admin-service";
import ServiceFilters from "@/components/dashboard/admin/service-filters";
import ServiceActions from "@/components/dashboard/admin/service-actions";

type Props = {
    searchParams: Promise<{
        search?: string;
        category?: string;
        status?: string;
    }>;
};

export default async function ManageServicesPage({ searchParams }: Props) {
    await requireRole("ADMIN");

    const {
        search = "",
        category = "",
        status = "",
    } = await searchParams;

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const { services, total } = await getAdminServices(
        token,
        search,
        category,
        status
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Manage Services</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Review and manage all vendor services on WedPlan.
                </p>
            </div>

            {/* Total Services */}
            <div className="rounded-xl border bg-white p-5">
                <p className="text-sm text-gray-500">Total Services</p>
                <h2 className="mt-2 text-3xl font-bold">{total}</h2>
            </div>

            {/* Filters */}
            <ServiceFilters />

            {/* Services Table */}
            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="p-4">Service</th>
                            <th className="p-4">Vendor</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Approval</th>
                            <th className="p-4">Availability</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {services.map((service) => (
                            <tr key={service._id}>
                                <td className="p-4">
                                    <p className="font-medium">
                                        {service.serviceName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {service.location}
                                    </p>
                                </td>

                                <td className="p-4">
                                    <p className="font-medium">
                                        {service.vendor?.businessName ||
                                            service.vendor?.name ||
                                            "Unknown vendor"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {service.vendor?.email || "—"}
                                    </p>
                                </td>

                                <td className="p-4">{service.category}</td>

                                <td className="p-4">
                                    ৳{service.price.toLocaleString("en-BD")}
                                </td>

                                <td className="p-4">{service.status}</td>

                                <td className="p-4">
                                    {service.status === "approved"
                                        ? service.availability
                                        : "—"}
                                </td>
                                <td className="p-4">
                                    <ServiceActions
                                        serviceId={service._id}
                                        status={service.status}
                                        availability={service.availability}
                                    />
                                </td>
                            </tr>
                        ))}

                        {services.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="p-8 text-center text-gray-500"
                                >
                                    No services found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
