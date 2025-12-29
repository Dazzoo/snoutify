import { Customer } from '@/types/customer';
import { supabase } from './client';

export async function generateCustomerId(): Promise<string> {
  const { data, error } = await supabase
    .from('customers')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(`Failed to generate customer ID: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return 'c1';
  }

  const lastId = data[0].id;
  const match = lastId.match(/^c(\d+)$/);

  if (!match) {
    return 'c1';
  }

  const nextNumber = parseInt(match[1], 10) + 1;
  return `c${nextNumber}`;
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

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    pets: (customer.pets || []).map((pet: any) => ({
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

