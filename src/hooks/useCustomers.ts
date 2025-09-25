import { customerKeys, fetchCustomers } from "@/services/customers";
import { CustomerFilters } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";

export function useCustomers(filters: CustomerFilters = {}) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: () => fetchCustomers(filters),
    enabled: true, // Always enabled, but could be conditional based on filters
    staleTime: 5 * 60 * 1000, // 5 minutes - customers data doesn't change often
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
  });
}
