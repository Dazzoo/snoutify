'use client';
import { SearchCard } from "@/components/SearchCard";

export default function Home() {
  return (
    <div className="w-full">
      <SearchCard 
        title="Customers and Pets"
        placeholder="Search by ID, name, email or phone"
      />
    </div>
  );
}
