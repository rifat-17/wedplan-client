import { IService } from "../types/services";




const API_URL = process.env.NEXT_PUBLIC_API_URL;



export const getServiceById = async (
    id: string
): Promise<IService | null> => {

    try {
        const response = await fetch(`${API_URL}/services/${id}`, {
            cache: "no-store",
        });

        if (response.status === 404) return null;

        if (!response.ok) {
            throw new Error("Failed to fetch service");
        }

        return response.json();

    } catch (error) {
        console.error("Get service error:", error);
        throw error;
    }
}