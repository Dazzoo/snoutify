import { createCustomer, createPet, deleteCustomer, generateCustomerId, generatePetId, supabase, validateCustomer, validatePet } from '@/lib/db';
import { Customer, Pet } from '@/types/customer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("searchText")?.toLowerCase() || "";
  const species =
    searchParams
      .get("species")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];
  
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "10", 10));

  try {
    let query = supabase
      .from('customers')
      .select(`
        id,
        name,
        email,
        phone,
        created_at,
        pets (
          id,
          name,
          species
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false });

    if (searchText) {
      query = query.or(`id.ilike.%${searchText}%,name.ilike.%${searchText}%,email.ilike.%${searchText}%,phone.ilike.%${searchText}%`);
    }

    const { data: customers, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch customers' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!customers) {
      return new Response(
        JSON.stringify({
          customers: [],
          total: 0,
          page,
          pageSize,
          totalPages: 0,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    interface SupabaseCustomer {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      created_at?: string;
      pets?: Array<{
        id: string;
        name: string;
        species: string;
      }>;
    }

    let filteredCustomers: Customer[] = customers.map((customer: SupabaseCustomer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      pets: (customer.pets || []).map((pet) => ({
        id: pet.id,
        name: pet.name,
        species: pet.species,
      })),
    }));

    if (searchText) {
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          customer.id.toLowerCase() === searchText ||
          customer.name.toLowerCase().includes(searchText) ||
          customer.email.toLowerCase().includes(searchText) ||
          customer.phone.toLowerCase().includes(searchText) ||
          customer.pets.some(
            (pet) =>
              pet.name.toLowerCase().includes(searchText) ||
              pet.id.toLowerCase() === searchText,
          ),
      );
    }

    if (species.length > 0) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        customer.pets.some((pet) => species.includes(pet.species)),
      );
    }

    const total = filteredCustomers.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    return new Response(
      JSON.stringify({
        customers: paginatedCustomers,
        total,
        page,
        pageSize,
        totalPages,
      }),
      {
        headers: {
          "Content-Type": "application/json",
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, pets } = body;

    const customerErrors = validateCustomer({ name, email, phone });
    if (customerErrors.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          errors: customerErrors,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const customerId = await generateCustomerId();

    let customer: Customer;
    try {
      customer = await createCustomer({
        id: customerId,
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
      });
    } catch (error) {
      console.error('Error creating customer:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create customer', message: error instanceof Error ? error.message : 'Unknown error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const createdPets: Pet[] = [];

    if (pets && Array.isArray(pets) && pets.length > 0) {
      for (const pet of pets) {
        const petErrors = validatePet(pet);
        if (petErrors.length > 0) {
          await deleteCustomer(customerId);
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
          const createdPet = await createPet({
            id: petId,
            customer_id: customerId,
            name: pet.name.trim(),
            species: pet.species.trim(),
          });
          createdPets.push(createdPet);
        } catch (error) {
          console.error('Error creating pet:', error);
          await deleteCustomer(customerId);
          return new Response(
            JSON.stringify({ error: 'Failed to create pet', message: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    customer.pets = createdPets;

    return new Response(
      JSON.stringify(customer),
      {
        status: 201,
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
