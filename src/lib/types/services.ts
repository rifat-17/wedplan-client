

export interface IService {
    _id: string;
    vendorId: string;
    serviceName: string;
    category: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    status: "pending" | "approved" | "rejected";
    createdAt: string;

    vendor?: {
        _id: string;
        name: string;
        email: string;
        image?: string;
    };
}