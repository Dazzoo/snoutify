'use client';
import { CustomerResults } from "@/components/CustomerResults";
import { SearchCard } from "@/components/SearchCard";
import { useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  const handleFiltersChange = (searchText: string, species: string) => {
    setSearchText(searchText);
    setSelectedSpecies(species);
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <div className="w-full">
      <SearchCard 
        title="Customers and Pets"
        placeholder="Search by ID, name, email or phone"
        searchValue={searchText}
        selectedSpecies={selectedSpecies}
        onSearchChange={handleSearchChange}
        onFiltersChange={handleFiltersChange}
      />
      <CustomerResults
        searchText={searchText}
        selectedSpecies={selectedSpecies}
      />
    </div>
  );
}
