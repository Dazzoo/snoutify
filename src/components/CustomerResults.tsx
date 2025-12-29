"use client";

import { ANIMAL_OPTIONS } from '@/constants/animals';
import { useCustomers } from '@/hooks/useCustomers';
import { CustomerFilters } from '@/types/customer';
import { useEffect, useState } from 'react';
import { CustomerCard } from './CustomerCard';
import { CustomerCardsSkeleton } from './CustomerCardSkeleton';
import { Pagination } from './Pagination';

interface CustomerResultsProps {
  searchText?: string;
  selectedSpecies?: string;
  className?: string;
}

const DEFAULT_PAGE_SIZE = 10;

export function CustomerResults({ 
  searchText,
  selectedSpecies,
  className = "" 
}: CustomerResultsProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const filters: CustomerFilters = {
    page,
    pageSize,
  };

  if (searchText?.trim()) {
    filters.searchText = searchText.trim();
  }
  if (selectedSpecies && selectedSpecies !== '') {
    filters.species = selectedSpecies;
  }

  const { data, isLoading, error, isError } = useCustomers(filters);
  const customers = data?.customers || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    setPage(1);
  }, [searchText, selectedSpecies]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };
  
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
          <CustomerCardsSkeleton count={pageSize} />
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

  const renderFilterBadges = () => {
    if (!hasFilters) return null;

    return (
      <div className="flex flex-wrap gap-2 text-sm mt-2">
        {searchText && (
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
            Search: &quot;{searchText}&quot;
          </span>
        )}
        {selectedSpecies && selectedSpecies !== '' && (
          <span className="bg-primary/10 text-secondary-foreground px-3 py-1 rounded-full">
            Species: {ANIMAL_OPTIONS.find(opt => opt.value === selectedSpecies)?.label || selectedSpecies}
          </span>
        )}
      </div>
    );
  };

  const renderEmptyState = () => (
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
  );

  return (
    <div className={`w-full bg-card px-9 py-8 ${className}`}>
      <div className="">
        {/* Results header with pagination */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4 mb-2">
            <h2 className="text-xl font-semibold text-dark-blue whitespace-nowrap">
              Customers: {total}
            </h2>
            {totalPages > 0 && (
              <div className="flex-1 lg:flex-initial min-w-0">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  className="lg:justify-end"
                />
              </div>
            )}
          </div>
          {renderFilterBadges()}
        </div>

        {/* Customer cards list or empty state */}
        {customers.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-6">
              {customers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
            {totalPages > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                pageSize={pageSize}
                total={total}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
