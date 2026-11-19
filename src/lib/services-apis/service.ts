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