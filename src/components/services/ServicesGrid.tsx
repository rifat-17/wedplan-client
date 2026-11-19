
import type { Service } from "@/data/home-data";
import { ServiceCard } from "../home/service-card";


interface ServicesGridProps {
  services: Service[];
}

const ServicesGrid = ({ services }: ServicesGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
};

export default ServicesGrid;
