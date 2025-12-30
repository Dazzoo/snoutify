"use client";

import { CreatePetForm } from '@/components/forms/CreatePetForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface CreatePetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  customerName?: string;
  onSuccess?: () => void;
}

export function CreatePetModal({
  open,
  onOpenChange,
  customerId,
  customerName,
  onSuccess,
}: CreatePetModalProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Pet{customerName ? ` to ${customerName}` : ''}</DialogTitle>
          <DialogDescription>
            Add one or more pets to this customer.
          </DialogDescription>
        </DialogHeader>
        <CreatePetForm customerId={customerId} onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}

