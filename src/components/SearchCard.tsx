"use client";

import { FilterDropdown } from "@/components/FilterDropdown";
import { Input } from "@/components/ui/input";
import { ANIMAL_OPTIONS } from "@/constants/animals";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SearchCardProps {
  title: string;
  placeholder: string;
  searchValue?: string;
  selectedSpecies?: string;
  onSearchChange?: (value: string) => void;
  onFiltersChange?: (searchText: string, species: string) => void;
  className?: string;
}

export function SearchCard({ 
  title, 
  placeholder,  
  searchValue = "", 
  selectedSpecies = "",
  onSearchChange,
  onFiltersChange,
  className = ""
}: SearchCardProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Convert API value back to animal ID for internal state
  const getAnimalIdFromValue = (value: string) => {
    if (!value) return "any";
    return ANIMAL_OPTIONS.find(opt => opt.value === value)?.id || "any";
  };  
  
  const [selectedAnimal, setSelectedAnimal] = useState(getAnimalIdFromValue(selectedSpecies));

  // Sync selectedAnimal when selectedSpecies prop changes
  useEffect(() => {
    setSelectedAnimal(getAnimalIdFromValue(selectedSpecies));
  }, [selectedSpecies]);

  const handleAnimalSelect = (optionId: string) => {
    setSelectedAnimal(optionId);
  };

  const handleReset = () => {
    setSelectedAnimal("any");
  };

  const handleApply = () => {
    setIsFilterOpen(false);
    const selectedOption = ANIMAL_OPTIONS.find(opt => opt.id === selectedAnimal);
    const apiValue = selectedOption?.value || "";
    onFiltersChange?.(searchValue, apiValue);
  };

  const handleSearchChange = (value: string) => {
    onSearchChange?.(value);
    const selectedOption = ANIMAL_OPTIONS.find(opt => opt.id === selectedAnimal);
    const apiValue = selectedOption?.value || "";
    onFiltersChange?.(value, apiValue);
  };
  return (
    <div className={`w-full bg-card px-9 py-8 ${className}`}>
      <div className="max-w-4xl ">
        <h1 className="mb-4 text-dark-blue">
          {title}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full sm:w-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.11523 0.895752C3.67638 0.895752 0.875 3.69713 0.875 7.13599C0.875 10.5748 3.67638 13.3762 7.11523 13.3762C8.2108 13.3762 9.24028 13.09 10.1365 12.5913C10.5117 13.6353 11.2909 14.7115 12.2031 15.6504C13.3114 16.7911 14.5683 17.75 15.875 17.75C16.3934 17.75 16.8943 17.5999 17.2471 17.2471C17.5999 16.8943 17.75 16.3934 17.75 15.875C17.75 14.5606 16.769 13.313 15.6211 12.2104C14.6741 11.3009 13.6005 10.5263 12.5791 10.1438C13.073 9.25086 13.3555 8.22587 13.3555 7.13599C13.3555 3.69713 10.5541 0.895752 7.11523 0.895752ZM7.11523 2.14575C9.87854 2.14575 12.1055 4.37268 12.1055 7.13599C12.1055 9.89929 9.87854 12.1262 7.11523 12.1262C4.35193 12.1262 2.125 9.89929 2.125 7.13599C2.125 4.37268 4.35193 2.14575 7.11523 2.14575ZM11.8259 11.2144C12.5661 11.4222 13.787 12.1823 14.7556 13.1125C15.7839 14.1002 16.5 15.3144 16.5 15.875C16.5 16.1691 16.4324 16.2942 16.3633 16.3633C16.2942 16.4324 16.1691 16.5 15.875 16.5C15.3067 16.5 14.0882 15.798 13.0991 14.78C12.1625 13.816 11.4054 12.5937 11.2119 11.8308C11.4305 11.6398 11.6357 11.4337 11.8259 11.2144Z" fill="#848A93"/>
              </svg>
            </div>
            <Input 
              type="text" 
              autoComplete="off"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full sm:w-[312px] h-[40px] pl-10"
            />
          </div>
          
          <div className="relative text-dark-blue w-full sm:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`w-full sm:w-[122px] h-[40px] rounded-xl flex items-center justify-between pl-5 pr-3 border  ${
                isFilterOpen 
                  ? 'bg-select-bg border-select-border-open' 
                  : 'bg-background border-medium shadow-[0_0_4px_-1px_hsla(0,0%,0%,0.02),0_1px_1px_0_hsla(0,0%,0%,0.06)]'
              }`}
            >
              <span className=" font-medium text-[14px] leading-[100%] tracking-[0%]">
                {selectedAnimal === "any" ? "Pets" : ANIMAL_OPTIONS.find(opt => opt.id === selectedAnimal)?.label || "Pets"}
              </span>
              <Image src="images/icons/chevron-down.svg" alt="chevron-down" width={16} height={16} />
            </button>
            
            <FilterDropdown
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              options={ANIMAL_OPTIONS}
              selectedOption={selectedAnimal}
              onOptionSelect={handleAnimalSelect}
              onReset={handleReset}
              onApply={handleApply}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
