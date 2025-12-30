"use client";

import { ANIMAL_OPTIONS } from '@/constants/animals';
import { Customer } from '@/types/customer';
import Image from 'next/image';
import { useState } from 'react';
import { CreatePetModal } from './modals/CreatePetModal';
import { Button } from './ui/button';

interface CustomerCardProps {
  customer: Customer;
  className?: string;
}

export function CustomerCard({ customer, className = "" }: CustomerCardProps) {
  const [isCreatePetModalOpen, setIsCreatePetModalOpen] = useState(false);

  const getPetIcon = (species: string) => {
    const animalOption = ANIMAL_OPTIONS.find(option => option.value === species);
    return animalOption?.iconPath || null;
  };

  const getPetIconDimensions = (species: string) => {
    const animalOption = ANIMAL_OPTIONS.find(option => option.value === species);
    return {
      width: animalOption?.iconWidth || 16,
      height: animalOption?.iconHeight || 16
    };
  };

  return (
    <div className={`bg-white rounded-lg border border-medium p-4 shadow-[0_0_4px_-1px_hsla(0,0%,0%,0.02),0_1px_1px_0_hsla(0,0%,0%,0.06)] ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Pets Section - Responsive width */}
        <div className="w-full sm:w-32 flex-shrink-0">
          {customer.pets.length > 0 ? (
            <div className="flex flex-col gap-1">
              <div className="text-center">
                <span className="text-xs font-medium text-muted-foreground">
                  {customer.pets.length} pet{customer.pets.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 justify-center sm:justify-center">
                {customer.pets.map((pet) => {
                  const iconPath = getPetIcon(pet.species);
                  const { width, height } = getPetIconDimensions(pet.species);
                  
                  return (
                    <div key={pet.id} className="flex items-center gap-1 px-2 py-1 bg-muted rounded border border-light">
                      {iconPath && (
                        <Image
                          src={iconPath}
                          alt={pet.species}
                          width={width}
                          height={height}
                          className="w-[14px] h-[14px]"
                        />
                      )}
                      <span className="text-xs text-dark-blue truncate max-w-[50px]">{pet.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-xs">No pets</p>
            </div>
          )}
        </div>

        {/* Border Separator - Hidden on mobile, visible on desktop */}
        <div className="hidden sm:block w-px h-12 bg-border-medium"></div>

        {/* Customer Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h3 className="text-base font-semibold text-dark-blue truncate">{customer.name}</h3>
            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded self-start sm:self-auto">
              ID: {customer.id}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{customer.email}</span>
            </p>
            {customer.phone && (
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{customer.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Add Pet Button */}
        <div className="flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreatePetModalOpen(true)}
          >
            Add Pet
          </Button>
        </div>
      </div>

      <CreatePetModal
        open={isCreatePetModalOpen}
        onOpenChange={setIsCreatePetModalOpen}
        customerId={customer.id}
        customerName={customer.name}
      />
    </div>
  );
}
