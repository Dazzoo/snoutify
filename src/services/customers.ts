import { CustomerFilters, CustomersResponse } from '@/types/customer';

export async function fetchCustomers(filters: CustomerFilters = {}): Promise<CustomersResponse> {
  const searchParams = new URLSearchParams();
  
  if (filters.searchText) {
    searchParams.append('searchText', filters.searchText);
  }
  
  if (filters.species) {
    searchParams.append('species', filters.species);
  }

  const url = `/api/customers${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error(`Failed to fetch customers: ${response.status} ${response.statusText}`);
    // Add status to error for better error handling in React Query
    (error as any).status = response.status;
    throw error;
  }
  
  return response.json();
}

// Query key factory for React Query
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (filters: CustomerFilters) => [...customerKeys.lists(), filters] as const,
};
