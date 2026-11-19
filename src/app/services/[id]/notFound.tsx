import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold">
                Service Not Found
            </h1>

            <p className="mt-3 text-muted-foreground">
                The service you're looking for doesn't exist
                or may have been removed.
            </p>

            <Button  className="mt-6">
                <Link href="/services">
                    Browse Services
                </Link>
            </Button>
        </div>
    );
}