import { Description, Entity, ID, extraction } from '@common';

export interface userProps {
  name: string;
  description: Description;
  birthDate: Date;
  coffeeCounter: number;
  coffeeExtraction: extraction;
  coffeeGrinderMachine: string;
  coffeeExtractionMachine: string;
}

export class User extends Entity<userProps> {
  constructor(props: userProps, id?: ID) {
    super(props, id);
  }
}
