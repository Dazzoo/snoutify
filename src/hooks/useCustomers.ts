import { customerKeys, fetchCustomers } from "@/services/customers";
import { CustomerFilters } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";

export function useCustomers(filters: CustomerFilters = {}) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: () => fetchCustomers(filters),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}
