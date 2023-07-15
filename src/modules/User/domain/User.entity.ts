import {
  Description,
  Email,
  Entity,
  ID,
  Name,
  Password,
  extraction,
} from '@common';

export interface UserProps {
  email: Email;
  password: Password;
  name: Name;
  description: Description;
  birthDate: number;
  coffeeCounter?: number;
  coffeeExtraction?: extraction;
  coffeeGrinderMachine?: string;
  coffeeExtractionMachine?: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: ID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: ID): User {
    // Create domain validations here
    const user = new User(
      {
        ...props,
      },
      id,
    );
    return user;
  }
}
