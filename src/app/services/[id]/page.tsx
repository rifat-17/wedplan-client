import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/apis/services";
import ServiceDetails from "@/components/services/ServiceDetails";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function ServiceDetailsPage({ params }: Props) {
    const { id } = await params;

    const service = await getServiceById(id);

    if (!service) {
        notFound();
    }

    return <ServiceDetails service={service} />;
}