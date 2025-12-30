"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ANIMAL_OPTIONS } from '@/constants/animals';
import { useCreatePet } from '@/hooks/useCreatePet';
import { useState } from 'react';

interface CreatePetFormProps {
  customerId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface PetFormData {
  name: string;
  species: string;
}

export function CreatePetForm({ customerId, onSuccess, onCancel }: CreatePetFormProps) {
  const [pets, setPets] = useState<PetFormData[]>([{ name: '', species: '' }]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createPet = useCreatePet();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    pets.forEach((pet, index) => {
      if (!pet.name.trim()) {
        newErrors[`pet-${index}-name`] = 'Pet name is required';
      }
      if (!pet.species.trim()) {
        newErrors[`pet-${index}-species`] = 'Pet species is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = pets.map(p => ({ name: p.name.trim(), species: p.species.trim() }));

    try {
      await createPet.mutateAsync({ customerId, data });
      resetForm();
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        const apiErrors = (error as { errors?: Array<{ field: string; message: string }> }).errors;
        if (apiErrors) {
          const errorMap: Record<string, string> = {};
          apiErrors.forEach(err => {
            errorMap[err.field] = err.message;
          });
          setErrors(errorMap);
        }
      }
    }
  };

  const resetForm = () => {
    setPets([{ name: '', species: '' }]);
    setErrors({});
  };

  const addPet = () => {
    setPets([...pets, { name: '', species: '' }]);
  };

  const removePet = (index: number) => {
    if (pets.length > 1) {
      setPets(pets.filter((_, i) => i !== index));
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`pet-${index}-`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const updatePet = (index: number, field: keyof PetFormData, value: string) => {
    const updatedPets = [...pets];
    updatedPets[index] = { ...updatedPets[index], [field]: value };
    setPets(updatedPets);
    if (errors[`pet-${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`pet-${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const animalOptions = ANIMAL_OPTIONS.filter(opt => opt.value !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-dark-blue">
            Pets
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPet}
          >
            Add Another Pet
          </Button>
        </div>

        {pets.map((pet, index) => (
          <div key={index} className="border border-medium rounded-lg p-3 mb-2 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-dark-blue">Pet {index + 1}</span>
              {pets.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePet(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div>
              <label htmlFor={`pet-${index}-name`} className="block text-sm font-medium text-dark-blue mb-1">
                Pet Name <span className="text-destructive">*</span>
              </label>
              <Input
                id={`pet-${index}-name`}
                value={pet.name}
                onChange={(e) => updatePet(index, 'name', e.target.value)}
                className={errors[`pet-${index}-name`] ? 'border-destructive' : ''}
              />
              {errors[`pet-${index}-name`] && (
                <p className="text-sm text-destructive mt-1">{errors[`pet-${index}-name`]}</p>
              )}
            </div>

            <div>
              <label htmlFor={`pet-${index}-species`} className="block text-sm font-medium text-dark-blue mb-1">
                Species <span className="text-destructive">*</span>
              </label>
              <Select
                value={pet.species}
                onValueChange={(value) => updatePet(index, 'species', value)}
              >
                <SelectTrigger
                  id={`pet-${index}-species`}
                  className={errors[`pet-${index}-species`] ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  {animalOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      iconPath={option.iconPath}
                      iconWidth={option.iconWidth}
                      iconHeight={option.iconHeight}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors[`pet-${index}-species`] && (
                <p className="text-sm text-destructive mt-1">{errors[`pet-${index}-species`]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {createPet.error && (
        <div className="bg-destructive/10 border border-destructive rounded-lg p-3">
          <p className="text-sm text-destructive">
            {createPet.error instanceof Error
              ? createPet.error.message
              : 'Failed to create pet'}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={createPet.isPending}>
          {createPet.isPending ? 'Creating...' : 'Add Pet' + (pets.length > 1 ? 's' : '')}
        </Button>
      </div>
    </form>
  );
}

