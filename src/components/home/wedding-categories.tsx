import { weddingCategories } from "@/lib/types/services";
import { SectionHeading } from "./section-heading";
import CategoryCard from "./category-card";


export default function WeddingCategories() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <SectionHeading
                    eyebrow="Explore Our Services"
                    title="Find Everything for Your Special Day"
                    description="Explore our wedding services by category and find the perfect vendors for your celebration."
                />

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {weddingCategories.map((category) => (
                        <CategoryCard
                            key={category.value}
                            name={category.name}
                            value={category.value}
                            image={category.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}