
import CancelBookingButton from "@/components/dashboard/customer/cancel-booking-button";
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getCustomerBookings } from "@/lib/services-apis/booking";

export default async function CustomerMyBookingsPage() {
    await requireRole("CUSTOMER");

    const token = await getTokenFromServer();

    const { bookings, total } = await getCustomerBookings(token);

    const statusStyles: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-700",
        Accepted: "bg-green-100 text-green-700",
        Rejected: "bg-red-100 text-red-700",
        Cancelled: "bg-gray-100 text-gray-700",
    };



    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Track your wedding service booking requests.
                </p>
                <p className="mt-3 text-sm text-gray-500">
                    {total} total bookings
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="rounded-xl border p-10 text-center">
                    <h2 className="text-lg font-semibold">
                        No bookings yet
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Your booking requests will appear here.
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

                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[booking.status]
                                        }`}
                                >
                                    {booking.status}
                                </span>
                            </div>

                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                {booking.service && (
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {booking.service.serviceName}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {booking.service.category}
                                        </p>

                                        <p className="mt-1 font-medium text-pink-600">
                                            ৳{booking.service.price.toLocaleString("en-BD")}
                                        </p>
                                    </div>
                                )}

                                {booking.vendor && (
                                    <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                        <p className="font-medium text-gray-900">
                                            Vendor: {booking.vendor.name}
                                        </p>

                                        <p className="text-gray-500">
                                            {booking.vendor.email}
                                        </p>
                                    </div>
                                )}
                                <p>
                                    <strong>Event Date:</strong>{" "}
                                    {booking.eventDate}
                                </p>

                                <p>
                                    <strong>Event Location:</strong>{" "}
                                    {booking.eventLocation}
                                </p>

                                <p>
                                    <strong>Additional Message:</strong>{" "}
                                    {booking.additionalMessage || "No additional message"}
                                </p>

                                <p>
                                    <strong>Booking Created:</strong>{" "}
                                    {new Date(booking.createdAt).toLocaleDateString("en-BD")}
                                </p>

                                {(booking.status === "Pending" || booking.status === "Accepted") && (
                                    <CancelBookingButton bookingId={booking._id} />
                                )}
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}
