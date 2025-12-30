import { createPet, CreatePetData, customerKeys } from '@/services/customers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, data }: { customerId: string; data: CreatePetData | CreatePetData[] }) =>
      createPet(customerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
    },
  });
}

