
import { notFound } from "next/navigation";
import { getPublicServiceById } from "@/lib/services-apis/service";
import { requireUser } from "@/lib/auth-guard";
import BookingForm from "@/components/services/booking-form";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ServiceDetailsPage({ params }: Props) {
    await requireUser();

    const { id } = await params;

    let service;

    try {
        service = await getPublicServiceById(id);
    } catch {
        notFound();
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid gap-10 md:grid-cols-2">
                <div>
                    <img
                        src={service.images[0]}
                        alt={service.serviceName}
                        className="h-[400px] w-full rounded-xl object-cover"
                    />
                </div>

                <div className="space-y-5">
                    <p className="font-medium text-pink-600">
                        {service.category}
                    </p>

                    <h1 className="text-3xl font-bold">
                        {service.serviceName}
                    </h1>

                    <p className="text-gray-600">
                        {service.description}
                    </p>

                    <p className="text-2xl font-bold">
                        ৳{service.price.toLocaleString("en-BD")}
                    </p>

                    <p className="text-gray-500">
                        Location: {service.location}
                    </p>
                </div>
            </div>

            {/* Booking Form */}
            <div className="mt-10">
                <BookingForm serviceId={service._id} />
            </div>
        </div>
    );
}
