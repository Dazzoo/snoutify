"use client";

import { CreateCustomerForm } from '@/components/forms/CreateCustomerForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface CreateCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateCustomerModal({ open, onOpenChange, onSuccess }: CreateCustomerModalProps) {
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
          <DialogTitle>Create New Customer</DialogTitle>
          <DialogDescription>
            Add a new customer and optionally add their pets.
          </DialogDescription>
        </DialogHeader>
        <CreateCustomerForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}

