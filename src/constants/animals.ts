export interface AnimalOption {
  id: string;
  label: string;
  value: string; // API value (singular form)
  iconPath: string;
  iconWidth: number;
  iconHeight: number;
}

export const ANIMAL_OPTIONS: AnimalOption[] = [
  {
    id: "any",
    label: "Any Animal",
    value: "",
    iconPath: "",
    iconWidth: 0,
    iconHeight: 0
  },
  {
    id: "dogs",
    label: "Dogs",
    value: "dog",
    iconPath: "/images/icons/animals/dog.svg",
    iconWidth: 15.79,
    iconHeight: 13.17
  },
  {
    id: "cats",
    label: "Cats",
    value: "cat",
    iconPath: "/images/icons/animals/cat.svg",
    iconWidth: 12.67,
    iconHeight: 13.18
  },
  {
    id: "birds",
    label: "Birds",
    value: "bird",
    iconPath: "/images/icons/animals/bird.svg",
    iconWidth: 14.67,
    iconHeight: 14
  },
  {
    id: "hamsters",
    label: "Hamsters",
    value: "hamster",
    iconPath: "/images/icons/animals/hamster.svg",
    iconWidth: 12,
    iconHeight: 13.67
  },
  {
    id: "rats",
    label: "Rats",
    value: "rat",
    iconPath: "/images/icons/animals/rat.svg",
    iconWidth: 14.68,
    iconHeight: 14.33
  }
];
