import { IService } from "@/lib/types/services";
import BookingButton from "./BookingButton";

interface Props {
    service: IService;
    currentUser?: {
        id: string;
        role: "customer" | "vendor" | "admin";
    } | null;
}

export default function BookingCard({ service, currentUser }: Props) {
    const isBookable =
        service.status === "approved" &&
        service.isAvailable;

    return (
        <div className="rounded-2xl border bg-card p-6 space-y-5">
            <div>
                <p className="text-sm text-muted-foreground">
                    Starting from
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    ৳{service.price.toLocaleString()}
                </h2>
            </div>

            <div className="border-t pt-5">
                <BookingButton
                    serviceId={service._id}
                    vendorId={service.vendorId}
                    currentUser={currentUser}
                    isBookable={isBookable}
                />
            </div>

            <p className="text-center text-xs text-muted-foreground">
                Contact the vendor for more details about this service.
            </p>
        </div>
    );
}