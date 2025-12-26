"use client";

import { ANIMAL_OPTIONS } from '@/constants/animals';
import { useCustomers } from '@/hooks/useCustomers';
import { CustomerFilters } from '@/types/customer';
import { CustomerCard } from './CustomerCard';
import { CustomerCardsSkeleton } from './CustomerCardSkeleton';

interface CustomerResultsProps {
  searchText?: string;
  selectedSpecies?: string;
  className?: string;
}

export function CustomerResults({ 
  searchText,
  selectedSpecies,
  className = "" 
}: CustomerResultsProps) {
  const filters: CustomerFilters = {};
  if (searchText?.trim()) {
    filters.searchText = searchText.trim();
  }
  if (selectedSpecies && selectedSpecies !== '') {
    filters.species = selectedSpecies;
  }

  const { data, isLoading, error, isError } = useCustomers(filters);
  const customers = data?.customers || [];
  
  // Loading state
  if (isLoading) {
    return (
      <div className={`w-full bg-card px-9 py-8 ${className}`}>
        <div className="">
          {/* Results header skeleton */}
          <div className="mb-6">
            <div className="h-6 bg-muted rounded w-48 mb-2 animate-pulse"></div>
            {(searchText || (selectedSpecies && selectedSpecies !== '')) && (
              <div className="flex flex-wrap gap-2 text-sm">
                {searchText && (
                  <div className="h-6 bg-muted rounded-full w-24 animate-pulse"></div>
                )}
                {selectedSpecies && selectedSpecies !== '' && (
                  <div className="h-6 bg-muted rounded-full w-32 animate-pulse"></div>
                )}
              </div>
            )}
          </div>

          {/* Skeleton customer cards */}
          <CustomerCardsSkeleton count={6} />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className={`w-full bg-card px-9 py-8 ${className}`}>
        <div className="max-w-4xl">
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Error loading customers</h3>
                <p className="text-muted-foreground text-sm">{error?.message || 'An unexpected error occurred'}</p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasFilters = searchText || (selectedSpecies && selectedSpecies !== '');

  // Results display
  return (
    <div className={`w-full bg-card px-9 py-8 ${className}`}>
      <div className="">
        {/* Results header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-dark-blue mb-2">
            Customers: {customers.length}
          </h2>
          {(searchText || (selectedSpecies && selectedSpecies !== '')) && (
            <div className="flex flex-wrap gap-2 text-sm">
              {searchText && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Search: &quot;{searchText}&quot;
                </span>
              )}
              {selectedSpecies && selectedSpecies !== '' && (
                <span className="bg-primary/10  text-secondary-foreground px-3 py-1 rounded-full">
                  Species: {ANIMAL_OPTIONS.find(opt => opt.value === selectedSpecies)?.label || selectedSpecies}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Customer cards list or empty state */}
        {customers.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {hasFilters ? 'No customers found' : 'No customers available'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {hasFilters 
                    ? 'Try adjusting your search criteria or filters to find customers.'
                    : 'There are currently no customers in the system.'
                  }
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {customers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
