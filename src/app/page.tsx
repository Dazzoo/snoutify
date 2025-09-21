'use client';
import { SearchCard } from "@/components/SearchCard";

export default function Home() {
  return (
    <div className="w-full">
      <SearchCard 
        title="Customers and Pets"
        placeholder="Search by ID, name, email or phone"
        dropdownOptions={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        dropdownPlaceholder="Pets"
        dropdownValue={''}
        onDropdownChange={(value) => console.log(value)}
      />
    </div>
  );
}
