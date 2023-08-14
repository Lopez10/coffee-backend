import { Entity, ID, roast } from '@common';

export interface coffeeProps {
  name: string;
  origin: string;
  height: number;
  roast: roast;
}

export class Coffee extends Entity<coffeeProps> {
  private constructor(props: coffeeProps, id?: ID) {
    super(props, id);
  }

  public toPrimitives() {
    return {
      id: this._id.value,
      name: this.props.name,
      origin: this.props.origin,
      height: this.props.height,
      roast: this.props.roast,
    };
  }

  public static create(props: coffeeProps, id?: ID): Coffee {
    const coffee = new Coffee(
      {
        ...props,
      },
      id,
    );
    return coffee;
  }
}
