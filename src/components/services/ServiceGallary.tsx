import Image from "next/image";

interface Props {
    images: string[];
}

export default function ServiceGallery({ images }: Props) {
    if (!images.length) {
        return (
            <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
                No images available
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                    src={images[0]}
                    alt="Service image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.slice(1).map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-video overflow-hidden rounded-lg"
                        >
                            <Image
                                src={image}
                                alt={`Service image ${index + 2}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}