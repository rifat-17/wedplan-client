
import DeleteServiceButton from "@/components/dashboard/vendor/delete-service-button";
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getVendorServices } from "@/lib/services-apis/service";



const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
};

export default async function MyServicesPage() {
    await requireRole("VENDOR");

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const { services, total } = await getVendorServices(token);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">
                    My Services
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage your wedding services.
                </p>
            </div>

            {/* Service Count */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                    Total Services
                </p>

                <p className="mt-2 text-3xl font-bold">
                    {total}
                </p>
            </div>

            {/* Services List */}
            {services.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center">
                    <h2 className="text-lg font-semibold">
                        No services found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        You haven't added any services yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="overflow-hidden rounded-xl border bg-white shadow-sm"
                        >
                            <img
                                src={service.images[0]}
                                alt={service.serviceName}
                                className="h-48 w-full object-cover"
                            />

                            <div className="space-y-3 p-5">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {service.serviceName}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {service.category}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-600">
                                    {service.description}
                                </p>

                                <p className="font-semibold">
                                    ৳{service.price.toLocaleString("en-BD")}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {service.location}
                                </p>

                                <div className="flex items-center justify-between border-t pt-3">
                                    <span className="text-sm text-gray-500">
                                        Approval Status
                                    </span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs
                                             font-semibold capitalize ${statusStyles[service.status]
                                            }`}
                                    >
                                        {service.status}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Availability
                                    </span>

                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${service.availability === "active"
                                        ? "bg-green-50 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                        }`}>
                                        {service.availability}
                                    </span>
                                </div>

                                <div className="flex justify-end border-t pt-4">
                                    <DeleteServiceButton serviceId={service._id} />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
