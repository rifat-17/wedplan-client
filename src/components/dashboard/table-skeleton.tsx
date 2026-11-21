import { Skeleton } from "@/components/ui/skeleton";

type TableSkeletonProps = {
    columns: number;
    rows?: number;
};

export default function TableSkeleton({
    columns,
    rows = 5,
}: TableSkeletonProps) {
    return (
        <div
            className="overflow-x-auto rounded-xl border bg-white"
            aria-hidden="true"
        >
            <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                    <tr>
                        {Array.from({ length: columns }).map((_, index) => (
                            <th key={index} className="p-4">
                                <Skeleton className="h-4 w-16" />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: columns }).map(
                                (_, columnIndex) => (
                                    <td key={columnIndex} className="p-4">
                                        <Skeleton className="h-4 w-24" />
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
