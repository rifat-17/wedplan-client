
"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function AuthRedirect() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (isPending) return;

        if (!session?.user) {
            router.replace("/sign-in");
            return;
        }

        const role = session.user.role;



        switch (role) {
            case "ADMIN":
                router.replace("/dashboard/admin");
                break;

            case "VENDOR":
                router.replace("/dashboard/vendor");
                break;

            case "CUSTOMER":
            default:
                router.replace("/dashboard/customer");
                break;
        }
    }, [session, isPending, router]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#FAF8F4]">
            <Loader2 className="h-8 w-8 animate-spin text-[#526B5A]" />

            <p className="text-sm text-[#6B716C]">
                Signing you in. Please wait...
            </p>
        </div>
    );
}
