
import type { Booking } from "@/lib/types/booking";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CreateBookingData = {
    serviceId: string;
    eventDate: string;
    eventLocation: string;
    additionalMessage?: string;
};

export const createBooking = async (
    token: string,
    bookingData: CreateBookingData
): Promise<{ message: string; booking: Booking }> => {
    if (!API_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create booking.");
    }

    return result;
};



export const getVendorBookings = async (
    token: string
): Promise<{
    bookings: Booking[];
    total: number;
}> => {
    if (!API_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(`${API_URL}/vendor/bookings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch vendor bookings.");
    }

    return result;
};



export const updateBookingStatus = async (
    token: string,
    bookingId: string,
    status: "Accepted" | "Rejected"
): Promise<{ message: string }> => {
    if (!API_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(
        `${API_URL}/vendor/bookings/${bookingId}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update booking status.");
    }

    return result;
};