import { createPet, generatePetId, getCustomerById, getPetsByCustomerId, validatePet } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const customerId = resolvedParams.id;
    const body = await request.json();

    const customer = await getCustomerById(customerId);

    if (!customer) {
      return new Response(
        JSON.stringify({ error: 'Customer not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const petsToAdd = body.pets && Array.isArray(body.pets) ? body.pets : [body];
    
    if (petsToAdd.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No pets provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    for (const pet of petsToAdd) {
      const petErrors = validatePet(pet);
      if (petErrors.length > 0) {
        return new Response(
          JSON.stringify({
            error: 'Validation failed',
            errors: petErrors,
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      try {
        const petId = await generatePetId();
        await createPet({
          id: petId,
          customer_id: customerId,
          name: pet.name.trim(),
          species: pet.species.trim(),
        });
      } catch (error) {
        console.error('Error creating pet:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to create pet', message: error instanceof Error ? error.message : 'Unknown error' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const allPets = await getPetsByCustomerId(customerId);
    customer.pets = allPets;

    return new Response(
      JSON.stringify(customer),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

