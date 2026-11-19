import { LucideIcon } from "lucide-react";

type StatsCardProps = {
    title: string;
    value: number | string;
    icon: LucideIcon;
    description: string;
};

export default function StatsCard({
    title,
    value,
    icon: Icon,
    description,
}: StatsCardProps) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                    {title}
                </p>

                <div className="rounded-lg bg-pink-50 p-2">
                    <Icon className="h-5 w-5 text-pink-600" />
                </div>
            </div>

            <h2 className="mt-4 text-3xl font-bold">
                {value}
            </h2>

            <p className="mt-2 text-xs text-gray-500">
                {description}
            </p>
        </div>
    );
}