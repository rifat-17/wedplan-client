type CreateServicePayload = {
    serviceName: string;
    category: string;
    description: string;
    price: number;
    location: string;
    images: string[];
};

export const createService = async (
    token: string,
    serviceData: CreateServicePayload
) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create service.");
    }

    return result;
};



export type VendorService = {
    _id: string;
    vendorId: string;
    serviceName: string;
    category: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    status: "pending" | "approved" | "rejected";
    availability: "active" | "inactive";
    createdAt: string;
};

type VendorServicesResponse = {
    services: VendorService[];
    total: number;
};

export const getVendorServices = async (
    token: string
): Promise<VendorServicesResponse> => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(`${API_URL}/vendor/services`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch vendor services.");
    }

    return result;
};




export const deleteVendorService = async (
    token: string,
    serviceId: string
) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(
        `${API_URL}/vendor/services/${serviceId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to delete service.");
    }

    return result;
};


type UpdateServicePayload = {
    serviceName?: string;
    category?: string;
    description?: string;
    price?: number;
    location?: string;
    images?: string[];
};


export const updateVendorService = async (
    token: string,
    serviceId: string,
    serviceData: UpdateServicePayload
) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(
        `${API_URL}/vendor/services/${serviceId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(serviceData),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update service.");
    }

    return result;
};



export const updateServiceAvailability = async (
    token: string,
    serviceId: string,
    availability: "active" | "inactive"
) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(
        `${API_URL}/vendor/services/${serviceId}/availability`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ availability }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to update service availability."
        );
    }

    return result;
};