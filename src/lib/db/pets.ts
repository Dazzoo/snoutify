import { Pet } from '@/types/customer';
import { supabase } from './client';

export async function generatePetId(): Promise<string> {
  const { data, error } = await supabase
    .from('pets')
    .select('id');

  if (error) {
    throw new Error(`Failed to generate pet ID: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return 'p1';
  }

  let maxNumber = 0;
  for (const pet of data) {
    const match = pet.id.match(/^p(\d+)$/);
    if (match) {
      const number = parseInt(match[1], 10);
      if (number > maxNumber) {
        maxNumber = number;
      }
    }
  }

  return `p${maxNumber + 1}`;
}

export async function createPet(data: {
  id: string;
  customer_id: string;
  name: string;
  species: string;
}): Promise<Pet> {
  const { data: pet, error } = await supabase
    .from('pets')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create pet: ${error.message}`);
  }

  return {
    id: pet.id,
    name: pet.name,
    species: pet.species,
  };
}

export async function getPetsByCustomerId(customerId: string): Promise<Pet[]> {
  const { data: pets, error } = await supabase
    .from('pets')
    .select('id, name, species')
    .eq('customer_id', customerId);

  if (error) {
    throw new Error(`Failed to fetch pets: ${error.message}`);
  }

  return (pets || []).map((pet) => ({
    id: pet.id,
    name: pet.name,
    species: pet.species,
  }));
}

