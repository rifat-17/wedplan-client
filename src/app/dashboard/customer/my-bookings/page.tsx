
import CancelBookingButton from "@/components/dashboard/customer/cancel-booking-button";
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getCustomerBookings } from "@/lib/services-apis/booking";
import Link from "next/link";

export default async function CustomerMyBookingsPage() {
    await requireRole("CUSTOMER");

    const token = await getTokenFromServer();

    const { bookings, total } = await getCustomerBookings(token);


    const pendingBookings = bookings.filter(
        (booking) => booking.status === "Pending"
    ).length;

    const acceptedBookings = bookings.filter(
        (booking) => booking.status === "Accepted"
    ).length;

    const rejectedBookings = bookings.filter(
        (booking) => booking.status === "Rejected"
    ).length;

    const cancelledBookings = bookings.filter(
        (booking) => booking.status === "Cancelled"
    ).length;


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
                <div className="grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border bg-white p-5">
                        <p className="text-sm text-gray-500">Pending</p>
                        <h2 className="mt-2 text-2xl font-bold text-yellow-600">
                            {pendingBookings}
                        </h2>
                    </div>

                    <div className="rounded-xl border bg-white p-5">
                        <p className="text-sm text-gray-500">Accepted</p>
                        <h2 className="mt-2 text-2xl font-bold text-green-600">
                            {acceptedBookings}
                        </h2>
                    </div>

                    <div className="rounded-xl border bg-white p-5">
                        <p className="text-sm text-gray-500">Rejected</p>
                        <h2 className="mt-2 text-2xl font-bold text-red-600">
                            {rejectedBookings}
                        </h2>
                    </div>
                    <div className="rounded-xl border bg-white p-5">
                        <p className="text-sm text-gray-500">Cancelled</p>
                        <h2 className="mt-2 text-2xl font-bold text-gray-600">
                            {cancelledBookings}
                        </h2>
                    </div>
                </div>
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
                                    <div className="mb-5 flex flex-col gap-4 sm:flex-row">
                                        {booking.service.images?.[0] && (
                                            <img
                                                src={booking.service.images[0]}
                                                alt={booking.service.serviceName}
                                                className="h-36 w-full rounded-lg object-cover sm:w-48"
                                            />
                                        )}

                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {booking.service.serviceName}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {booking.service.category}
                                            </p>

                                            <p className="font-semibold text-pink-600">
                                                ৳{booking.service.price.toLocaleString("en-BD")}
                                            </p>
                                            <Link
                                                href={`/services/${booking.serviceId}`}
                                                className="inline-block text-sm font-medium text-pink-600 hover:underline"
                                            >
                                                View Service Details →
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {booking.vendor && (
                                    <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                        <p className="font-medium text-gray-900">
                                            <span className="text-pink-700">Vendor: </span> {booking.vendor.name}
                                        </p>

                                        <a
                                            href={`mailto:${booking.vendor.email}`}
                                            className="text-sm text-pink-600 hover:underline"
                                        >
                                            {booking.vendor.email}
                                        </a>
                                    </div>
                                )}
                                <p>
                                    <strong>Event Date:</strong>{" "}
                                    {new Date(`${booking.eventDate}T00:00:00`).toLocaleDateString("en-BD", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
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
                                    {new Date(booking.createdAt).toLocaleDateString("en-BD", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
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
