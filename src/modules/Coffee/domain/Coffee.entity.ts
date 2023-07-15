import { Entity, ID, roast } from '@common';

export interface coffeeProps {
  name: string;
  origin: string;
  height: number;
  roast: roast;
}

export class Coffee extends Entity<coffeeProps> {
  constructor(props: coffeeProps, id?: ID) {
    super(props, id);
  }
}
