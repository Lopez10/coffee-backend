import { extraction } from '@common';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  birthDate: Date;
  coffeeCounter: number;
  coffeeExtraction: extraction;
  coffeeGrinderMachine: string;
  coffeeExtractionMachine: string;
}
