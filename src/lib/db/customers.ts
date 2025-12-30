import { Customer } from '@/types/customer';
import { supabase } from './client';

export async function generateCustomerId(): Promise<string> {
  const { data, error } = await supabase
    .from('customers')
    .select('id');

  if (error) {
    throw new Error(`Failed to generate customer ID: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return 'c1';
  }

  let maxNumber = 0;
  for (const customer of data) {
    const match = customer.id.match(/^c(\d+)$/);
    if (match) {
      const number = parseInt(match[1], 10);
      if (number > maxNumber) {
        maxNumber = number;
      }
    }
  }

  return `c${maxNumber + 1}`;
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const { data: customer, error } = await supabase
    .from('customers')
    .select(`
      id,
      name,
      email,
      phone,
      pets (
        id,
        name,
        species
      )
    `)
    .eq('id', id)
    .single();

  if (error || !customer) {
    return null;
  }

  interface SupabasePet {
    id: string;
    name: string;
    species: string;
  }

  interface SupabaseCustomerWithPets {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    pets?: SupabasePet[];
  }

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    pets: ((customer as SupabaseCustomerWithPets).pets || []).map((pet) => ({
      id: pet.id,
      name: pet.name,
      species: pet.species,
    })),
  };
}

export async function createCustomer(data: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}): Promise<Customer> {
  const { data: customer, error } = await supabase
    .from('customers')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create customer: ${error.message}`);
  }

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    pets: [],
  };
}

export async function deleteCustomer(id: string): Promise<void> {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete customer: ${error.message}`);
  }
}

