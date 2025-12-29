export interface Pet {
  id: string;
  name: string;
  species: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: Pet[];
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface CustomersResponse {
  customers: Customer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CustomerFilters {
  searchText?: string;
  species?: string;
  page?: number;
  pageSize?: number;
}
