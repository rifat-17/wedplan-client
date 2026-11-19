import Image from "next/image";

interface Props {
    vendor: {
        _id: string;
        name: string;
        email: string;
        image?: string;
    };
}

export default function VendorInformation({ vendor }: Props) {
    return (
        <div className="rounded-xl border p-6">
            <h2 className="font-semibold">Service Provider</h2>

            <div className="mt-4 flex items-center gap-3">
                {vendor.image ? (
                    <Image
                        src={vendor.image}
                        alt={vendor.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                ) : (
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                        {vendor.name.charAt(0)}
                    </div>
                )}

                <div>
                    <p className="font-medium">{vendor.name}</p>
                    <p className="text-sm text-muted-foreground">
                        Service Vendor
                    </p>
                </div>
            </div>
        </div>
    );
}