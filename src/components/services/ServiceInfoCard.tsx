
import { IService } from "@/lib/types/services";
import { MapPin, Tag } from "lucide-react";

interface Props {
    service: IService;
}

export default function ServiceInfoCard({ service }: Props) {
    return (
        <div className="rounded-2xl border bg-card p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm text-primary">
                <Tag size={16} />
                {service.category}
            </div>

            <div>
                <h1 className="text-2xl font-bold md:text-3xl">
                    {service.serviceName}
                </h1>

                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    {service.location}
                </p>
            </div>

            <div className="border-t pt-5">
                <h2 className="text-lg font-semibold">
                    About This Service
                </h2>

                <p className="mt-3 leading-7 text-muted-foreground whitespace-pre-line">
                    {service.description}
                </p>
            </div>
        </div>
    );
}