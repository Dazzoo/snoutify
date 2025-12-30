import { Customer, CustomerFilters, CustomersResponse } from '@/types/customer';

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

export interface CreateCustomerData {
  name: string;
  email: string;
  phone?: string;
  pets?: Array<{ name: string; species: string }>;
}

export async function createCustomer(data: CreateCustomerData): Promise<Customer> {
  const response = await fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `Failed to create customer: ${response.status} ${response.statusText}`);
    (error as Error & { status: number; errors?: unknown }).status = response.status;
    (error as Error & { status: number; errors?: unknown }).errors = errorData.errors;
    throw error;
  }

  return response.json();
}

export interface CreatePetData {
  name: string;
  species: string;
}

export async function createPet(customerId: string, data: CreatePetData | CreatePetData[]): Promise<Customer> {
  const body = Array.isArray(data) ? { pets: data } : data;
  
  const response = await fetch(`/api/customers/${customerId}/pets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `Failed to create pet: ${response.status} ${response.statusText}`);
    (error as Error & { status: number; errors?: unknown }).status = response.status;
    (error as Error & { status: number; errors?: unknown }).errors = errorData.errors;
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
