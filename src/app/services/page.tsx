
"use client";

import { useState } from "react";

import { featuredServices, serviceCategoryMap } from "@/data/home-data";

import ServicesHeader from "@/components/services/ServicesHeader";
import ServicesFilter from "@/components/services/ServicesFilter";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesEmptyState from "@/components/services/ServicesEmptyState";

const ServicesPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");

  // Filter services
  const filteredServices = featuredServices.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      category === "all" ||
      serviceCategoryMap[category]?.includes(service.category) === true;

    const matchesLocation =
      location === "all" || service.location === location;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setLocation("all");
  };

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        {/* Page Header */}
        <ServicesHeader />

        {/* Search and Filters */}
        <ServicesFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          location={location}
          setLocation={setLocation}
        />

        {/* Services Results */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#172033]">
              Available Services
            </h2>

            <p className="text-sm text-gray-500">
              {filteredServices.length}{" "}
              {filteredServices.length === 1 ? "service" : "services"} found
            </p>
          </div>

          {filteredServices.length > 0 ? (
            <ServicesGrid services={filteredServices} />
          ) : (
            <ServicesEmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
