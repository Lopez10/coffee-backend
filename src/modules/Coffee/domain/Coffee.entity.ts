import { Entity, ID, Name, Roast } from '@common';

export interface coffeeProps {
  name: Name;
  origin: string;
  height: number;
  roast: Roast;
  userId: ID;
}

export class Coffee extends Entity<coffeeProps> {
  private constructor(props: coffeeProps, id?: ID) {
    super(props, id);
  }

  public toPrimitives() {
    return {
      id: this._id.value,
      name: this.props.name.value,
      origin: this.props.origin,
      height: this.props.height,
      roast: this.props.roast.value,
      userId: this.props.userId.value,
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
