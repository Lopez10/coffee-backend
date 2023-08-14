import { Entity, ID, Name, roast } from '@common';

export interface coffeeProps {
  name: Name;
  origin: string;
  height: number;
  roast: roast;
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
      roast: this.props.roast,
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
