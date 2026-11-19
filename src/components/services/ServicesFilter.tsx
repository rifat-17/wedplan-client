
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { featuredServices, categories } from "@/data/home-data";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

interface ServicesFilterProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

const ServicesFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
}: ServicesFilterProps) => {
  const locations = [
    ...new Set(featuredServices.map((service) => service.location)),
  ];

  return (
    <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-rose-700" />

        <h2 className="font-semibold text-[#172033]">
          Find Your Service
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="h-11 pl-10"
          />
        </div>

        {/* Category */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>

            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="h-11 w-full">
            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>

            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ServicesFilter;
