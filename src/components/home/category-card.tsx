import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
    name: string;
    value: string;
    image: string;
}

export default function CategoryCard({
    name,
    value,
    image,
}: CategoryCardProps) {
    return (
        <Link
            href={`/services?category=${encodeURIComponent(value)}`}
            className="group relative block h-64 overflow-hidden rounded-2xl"
        >
            {/* Category Image */}
            <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Category Information */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <h3 className="text-xl font-semibold text-white">
                    {name}
                </h3>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={20} />
                </span>
            </div>
        </Link>
    );
}