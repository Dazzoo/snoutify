import { createCustomer, CreateCustomerData, customerKeys } from '@/services/customers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerData) => createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
    },
  });
}

