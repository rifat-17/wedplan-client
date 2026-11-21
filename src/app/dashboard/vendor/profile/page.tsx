
import { requireRole } from "@/lib/auth-guard";
import ProfileForm from "@/components/dashboard/profile/profile-form";

export default async function VendorProfileSettingsPage() {
    const user = await requireRole("VENDOR");

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-[#252A26]">
                    Profile Settings
                </h1>

                <p className="mt-2 text-[#6B716C]">
                    Manage your account, {user.name}.
                </p>
            </div>

            <ProfileForm
                name={user.name}
                email={user.email}
                image={user.image}
            />
        </section>
    );
}
