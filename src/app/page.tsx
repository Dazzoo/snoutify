'use client';
import { CustomerResults } from "@/components/CustomerResults";
import { SearchCard } from "@/components/SearchCard";
import { useDebounce } from "@/hooks/useDebounce";
import { QueryProvider } from "@/providers/QueryProvider";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ searchText: "", species: "" });
  
  // Debounce search text with 300ms delay
  const debouncedSearchText = useDebounce(searchText, 300);

  // Update applied filters when debounced search text changes
  useEffect(() => {
    setAppliedFilters(prev => ({
      ...prev,
      searchText: debouncedSearchText
    }));
  }, [debouncedSearchText]);

  const handleFiltersChange = (searchText: string, species: string) => {
    setSearchText(searchText);
    setSelectedSpecies(species);
    setAppliedFilters({ searchText, species });
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <div className="w-full">
      <QueryProvider>
      <SearchCard 
        title="Customers and Pets"
        placeholder="Search by ID, name, email or phone"
        searchValue={searchText}
        selectedSpecies={selectedSpecies}
        onSearchChange={handleSearchChange}
        onFiltersChange={handleFiltersChange}
      />
      <CustomerResults
        searchText={appliedFilters.searchText}
        selectedSpecies={appliedFilters.species}
      />
      </QueryProvider>
    </div>
  );
}
