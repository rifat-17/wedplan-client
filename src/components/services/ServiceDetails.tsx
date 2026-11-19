import { IService } from "@/lib/types/services";
import ServiceGallery from "./ServiceGallary";
import ServiceInfoCard from "./ServiceInfoCard";
import BookingCard from "./BookingCard";
import VendorCard from "./VendorCard";


interface Props {
    service: IService;
    currentUser?: {
        id: string;
        role: "customer" | "vendor" | "admin";
    } | null;
}

export default function ServiceDetails({
    service,
    currentUser,
}: Props) {
    return (
        <main className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* Service Information */}
                <div className="space-y-6 lg:col-span-2">
                    <ServiceGallery images={service.images} />

                    <ServiceInfoCard service={service} />
                </div>

                {/* Sidebar Cards */}
                <aside className="space-y-6">
                    <BookingCard
                        service={service}
                        currentUser={currentUser}
                    />

                    <VendorCard service={service} />
                </aside>

            </div>
        </main>
    );
}