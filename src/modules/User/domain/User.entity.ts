import {
  Description,
  Email,
  Entity,
  ID,
  Name,
  Password,
  extraction,
} from '@common';
import { JWTToken } from '@common/auth/jwt';

export interface UserProps {
  email: Email;
  password: Password;
  name: Name;
  description: Description;
  accessToken: JWTToken;
  coffeeCounter?: number;
  coffeeExtraction?: extraction;
  coffeeGrinderMachine?: string;
  coffeeExtractionMachine?: string;
}

export class User extends Entity<UserProps> {
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
      accessToken: this.props.accessToken,
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
