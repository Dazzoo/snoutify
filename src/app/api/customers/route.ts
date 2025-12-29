import data from "./customers.json";

type Pet = {
  id: string;
  name: string;
  species: string;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: Pet[];
};

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

  let filteredCustomers: Customer[] = data.customers;

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
}
