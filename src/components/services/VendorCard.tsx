import Image from "next/image";

import { UserRound } from "lucide-react";
import { IService } from "@/lib/types/services";

interface Props {
    service: IService;
}

export default function VendorCard({ service }: Props) {
    const vendor = service.vendor;

    return (
        <div className="rounded-2xl border bg-card p-6">
            <h2 className="font-semibold text-lg">
                Service Provider
            </h2>

            <div className="mt-5 flex items-center gap-3">
                {vendor.image ? (
                    <Image
                        src={vendor.image}
                        alt={vendor.name}
                        width={52}
                        height={52}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="flex size-13 items-center justify-center rounded-full bg-muted">
                        <UserRound size={24} />
                    </div>
                )}

                <div>
                    <p className="font-semibold">
                        {vendor.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Service Vendor
                    </p>
                </div>
            </div>
        </div>
    );
}