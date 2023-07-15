import { Entity, ID, roast } from '@common';

export interface coffeeProps {
  name: string;
  origin: string;
  height: number;
  roast: roast;
}

export class Coffee extends Entity<coffeeProps> {
  public toPrimitives() {
    return {
      id: this._id.value,
      name: this.props.name,
      origin: this.props.origin,
      height: this.props.height,
      roast: this.props.roast,
    };
  }
  constructor(props: coffeeProps, id?: ID) {
    super(props, id);
  }
}
