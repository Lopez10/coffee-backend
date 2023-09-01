import {
  Description,
  Email,
  Entity,
  ID,
  Name,
  Password,
  Role,
  extraction,
} from '@common';

export interface UserProps {
  email: Email;
  password: Password;
  name: Name;
  description: Description;
  role: Role;
  coffeeCounter?: number;
  coffeeExtraction?: extraction;
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
      description: this.props.description.value,
      role: this.props.role.value,
      coffeeCounter: this.props.coffeeCounter,
      coffeeExtraction: this.props.coffeeExtraction,
      coffeeGrinderMachine: this.props.coffeeGrinderMachine,
      coffeeExtractionMachine: this.props.coffeeExtractionMachine,
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
