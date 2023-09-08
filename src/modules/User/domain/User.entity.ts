import {
  CoffeeExtraction,
  Description,
  Email,
  Entity,
  ID,
  Name,
  Password,
  Role,
} from '@common';

export interface UserProps {
  email: Email;
  password: Password;
  name: Name;
  role: Role;
  description?: Description;
  coffeeCounter?: number;
  coffeeExtraction?: CoffeeExtraction;
  coffeeGrinderMachine?: string;
  coffeeExtractionMachine?: string;
}

export class User extends Entity<UserProps> {
  changeRole(role: Role) {
    this.props.role = role;
  }

  private constructor(props: UserProps, id?: ID) {
    super(props, id);
  }

  public toPrimitives() {
    return {
      id: this._id.value,
      name: this.props.name.value,
      email: this.props.email.value,
      password: this.props.password.value,
      role: this.props.role.value,
      description: this.props.description.value || null,
      coffeeCounter: this.props.coffeeCounter || null,
      coffeeExtraction: this.props.coffeeExtraction.value || null,
      coffeeGrinderMachine: this.props.coffeeGrinderMachine || null,
      coffeeExtractionMachine: this.props.coffeeExtractionMachine || null,
    };
  }

  public static create(props: UserProps, id?: ID): User {
    const user = new User(
      {
        ...props,
      },
      id,
    );
    return user;
  }
}
