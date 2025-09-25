"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FilterOption {
  id: string;
  label: string;
  iconPath: string;
  iconWidth: number;
  iconHeight: number;
}

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  options: FilterOption[];
  selectedOption: string;
  onOptionSelect: (optionId: string) => void;
  onReset: () => void;
  onApply: () => void;
  className?: string;
}

export function FilterDropdown({
  isOpen,
  onClose,
  options,
  selectedOption,
  onOptionSelect,
  onReset,
  onApply,
  className = ""
}: FilterDropdownProps) {
  return (
    <div className={`
      absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-medium z-50 min-w-[22rem]
      transition-all duration-200 ease-out transform origin-top
      ${isOpen 
        ? 'opacity-100 scale-y-100 translate-y-0' 
        : 'opacity-0 scale-y-95 translate-y-[-8px] pointer-events-none'
      }
      ${className}
    `}>
      {/* Filter Options */}
      <div className="pl-4 pb-4 pr-4 pt-5">
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onOptionSelect(option.id)}
              className={`
                flex items-center justify-center py-[0.375rem] px-4 rounded-[28px] border transition-colors gap-2 min-w-0 flex-shrink-0
                ${selectedOption === option.id 
                  ? 'bg-normal-blue text-white border-transparent' 
                  : 'bg-white border-border-light text-dark-blue'
                }
              `}
            >
              {option.iconPath && (
                <div className="flex-shrink-0">
                  <Image
                    src={option.iconPath}
                    alt={option.label}
                    width={option.iconWidth}
                    height={option.iconHeight}
                    className={`w-[${option.iconWidth}px] h-[${option.iconHeight}px] ${selectedOption === option.id ? 'brightness-0 invert' : ''}`}
                  />
                </div>
              )}
              <span className={`font-medium text-[14px] leading-[100%] tracking-[0%] whitespace-nowrap ${selectedOption === option.id ? 'text-white' : 'text-dark-blue'}`}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-medium"></div>

      {/* Action Buttons */}
      <div className="p-4">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="w-[145px]"
            onClick={onReset}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            className="w-[145px]"
            onClick={onApply}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
