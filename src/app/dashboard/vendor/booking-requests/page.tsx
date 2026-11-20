
import BookingAction from "@/components/dashboard/vendor/booking-action";
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getVendorBookings } from "@/lib/services-apis/booking";

export default async function VendorBookingRequestsPage() {
    await requireRole("VENDOR");

    const token = await getTokenFromServer();

    const { bookings, total } = await getVendorBookings(token);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Booking Requests</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Manage booking requests from your customers.
                </p>
                <p className="mt-3 text-sm text-gray-500">
                    {total} total booking requests
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="rounded-xl border p-10 text-center">
                    <h2 className="text-lg font-semibold">
                        No booking requests yet
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        New customer booking requests will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="rounded-xl border bg-white p-5 shadow-sm"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h2 className="font-semibold">
                                    Booking #{booking._id.slice(-6)}
                                </h2>

                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                                    {booking.status}
                                </span>
                            </div>

                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <p>
                                    <strong>Event Date:</strong>{" "}
                                    {booking.eventDate}
                                </p>

                                <p>
                                    <strong>Event Location:</strong>{" "}
                                    {booking.eventLocation}
                                </p>

                                <p>
                                    <strong>Customer ID:</strong>{" "}
                                    {booking.customerId}
                                </p>

                                <p>
                                    <strong>Message:</strong>{" "}
                                    {booking.additionalMessage || "No additional message"}
                                </p>


                            </div>

                            {booking.status === "Pending" && (
                                <BookingAction bookingId={booking._id} />
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
