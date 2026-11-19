
type Props = {
    title: string;
    description: string;
};

export default function DashboardSection({
    title,
    description,
}: Props) {
    return (
        <section className="min-h-screen bg-[#FAF8F4] p-6">
            <h1 className="text-2xl font-semibold text-[#252A26]">
                {title}
            </h1>
            <p className="mt-2 text-[#6B716C]">{description}</p>
        </section>
    );
}
