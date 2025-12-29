import { CustomerFilters, CustomersResponse } from '@/types/customer';

export async function fetchCustomers(filters: CustomerFilters = {}): Promise<CustomersResponse> {
  const searchParams = new URLSearchParams();
  
  if (filters.searchText) {
    searchParams.append('searchText', filters.searchText);
  }
  
  if (filters.species) {
    searchParams.append('species', filters.species);
  }

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;
  searchParams.append('page', page.toString());
  searchParams.append('pageSize', pageSize.toString());

  const url = `/api/customers?${searchParams.toString()}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error(`Failed to fetch customers: ${response.status} ${response.statusText}`);
    (error as Error & { status: number }).status = response.status;
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
