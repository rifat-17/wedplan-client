
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBooking } from "@/lib/services-apis/booking";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type Props = {
    serviceId: string;
};

export default function BookingForm({ serviceId }: Props) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const eventDate = formData.get("eventDate") as string;
        const eventLocation = formData.get("eventLocation") as string;
        const additionalMessage = formData.get("additionalMessage") as string;

        try {
            setLoading(true);

            const token = await getTokenFromClient();

            if (!token) {
                throw new Error("Please sign in to submit a booking.");
            }

            await createBooking(token, {
                serviceId,
                eventDate,
                eventLocation,
                additionalMessage,
            });

            toast.success("Booking request submitted successfully!");

            form.reset();
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to submit booking."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">
                Book This Service
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                Submit your event details to request this service.
            </p>

            <form onSubmit={handleBooking} className="mt-6 space-y-5">
                <div className="space-y-2">
                    <label htmlFor="eventDate" className="text-sm font-medium">
                        Event Date
                    </label>

                    <input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        required
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="eventLocation" className="text-sm font-medium">
                        Event Location
                    </label>

                    <input
                        id="eventLocation"
                        name="eventLocation"
                        type="text"
                        placeholder="Enter your event location"
                        required
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="additionalMessage" className="text-sm font-medium">
                        Additional Message (Optional)
                    </label>

                    <textarea
                        id="additionalMessage"
                        name="additionalMessage"
                        rows={4}
                        placeholder="Tell the vendor more about your event..."
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Submitting..." : "Submit Booking Request"}
                </button>
            </form>
        </div>
    );
}
