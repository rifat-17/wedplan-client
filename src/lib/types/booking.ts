export type BookingStatus =
    | "Pending"
    | "Accepted"
    | "Rejected"
    | "Cancelled";

export type Booking = {
    _id: string;
    serviceId: string;
    vendorId: string;
    customerId: string;
    eventDate: string;
    eventLocation: string;
    additionalMessage?: string;
    status: BookingStatus;
    createdAt: string;
    
    service?: {
        serviceName: string;
        category: string;
        images: string[];
        price: number;
    } | null;

    vendor?: {
        name: string;
        email: string;
        image?: string;
    } | null;
};