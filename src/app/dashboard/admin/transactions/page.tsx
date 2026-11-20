
import { requireRole } from "@/lib/auth-guard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getAdminTransactions } from "@/lib/services-apis/admin-service";
import TransactionFilters from "@/components/dashboard/admin/transaction-filters";

type Props = {
    searchParams: Promise<{
        search?: string;
        status?: string;
        plan?: string;
    }>;
};

export default async function AdminTransactionsPage({
    searchParams,
}: Props) {
    await requireRole("ADMIN");

    const {
        search = "",
        status = "",
        plan = "",
    } = await searchParams;

    const token = await getTokenFromServer();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const { transactions, total } = await getAdminTransactions(
        token,
        search,
        status,
        plan
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Transactions</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Monitor vendor subscription payments and transactions.
                </p>
            </div>

            {/* Total */}
            <div className="rounded-xl border bg-white p-5">
                <p className="text-sm text-gray-500">Total Transactions</p>
                <h2 className="mt-2 text-3xl font-bold">{total}</h2>
            </div>

            {/* Filters */}
            <TransactionFilters />

            {/* Transactions Table */}
            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="p-4">Vendor</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Transaction Date</th>
                            <th className="p-4">Session ID</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td className="p-4">
                                    <p className="font-medium">
                                        {transaction.vendor?.businessName ||
                                            transaction.vendor?.name ||
                                            "Unknown vendor"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {transaction.vendor?.email || "—"}
                                    </p>
                                </td>

                                <td className="p-4">
                                    {transaction.plan}
                                </td>

                                <td className="p-4 font-medium">
                                    {new Intl.NumberFormat("en-BD", {
                                        style: "currency",
                                        currency: transaction.currency || "BDT",
                                    }).format(transaction.amount)}
                                </td>

                                <td className="p-4">
                                    <span className="capitalize">
                                        {transaction.status}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {new Date(
                                        transaction.createdAt
                                    ).toLocaleDateString("en-BD")}
                                </td>

                                <td className="max-w-40 truncate p-4 text-xs text-gray-500">
                                    {transaction.stripeSessionId || "—"}
                                </td>
                            </tr>
                        ))}

                        {transactions.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-8 text-center text-gray-500"
                                >
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
