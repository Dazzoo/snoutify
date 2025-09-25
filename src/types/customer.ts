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

export interface CustomersResponse {
  customers: Customer[];
}

export interface CustomerFilters {
  searchText?: string;
  species?: string;
}
