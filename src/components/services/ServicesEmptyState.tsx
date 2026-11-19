
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesEmptyStateProps {
  onClearFilters: () => void;
}

const ServicesEmptyState = ({
  onClearFilters,
}: ServicesEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
        <SearchX className="h-8 w-8 text-rose-700" />
      </div>

      <h3 className="text-xl font-semibold text-[#172033]">
        No Services Found
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        We couldn't find any services matching your filters.
        Try changing your search or selecting a different category or location.
      </p>

      <Button
        onClick={onClearFilters}
        className="mt-6 bg-rose-700 text-white hover:bg-rose-800"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default ServicesEmptyState;
