

export interface ServiceProps {
    _id: string;
    serviceName: string;
    category: string;
    price: number;
    location: string;
    images: string[];

    vendor: {
        name: string;
        image?: string;
        businessName?: string;
    };
}



export const weddingCategories = [
    {
        name: "Photography & Videography",
        value: "Photography",
        image: "/images/categories/photography.jpg",
    },
    {
        name: "Wedding Venues",
        value: "Venue",
        image: "/images/categories/venues.jpg",
    },
    {
        name: "Decoration & Florist",
        value: "Decoration",
        image: "/images/categories/decor.jpg",
    },
    {
        name: "Catering Services",
        value: "Catering",
        image: "/images/categories/catering.jpg",
    },
    {
        name: "Makeup & Styling",
        value: "Makeup",
        image: "/images/categories/makeup.jpg",
    },
    {
        name: "Wedding Fashion",
        value: "Other",
        image: "/images/categories/fashion.jpg",
    },
];