
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getCustomerBookings } from "@/lib/services-apis/booking";


export default async function CustomerDashboard() {
    await requireRole("CUSTOMER");

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

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

    const stats = [
        {
            title: "Total Booking Requests",
            value: total,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Pending Bookings",
            value: pendingBookings,
            color: "bg-yellow-50 text-yellow-600",
        },
        {
            title: "Accepted Bookings",
            value: acceptedBookings,
            color: "bg-green-50 text-green-600",
        },
        {
            title: "Rejected Bookings",
            value: rejectedBookings,
            color: "bg-red-50 text-red-600",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Customer Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Track your wedding service booking requests.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            {stat.title}
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                            {stat.value}
                        </h2>

                        <span
                            className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${stat.color}`}
                        >
                            {stat.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
