import { Email, Entity, ID, Password } from '@common';

export interface authProps {
  id: ID;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt: Date;
}

export class Auth extends Entity<authProps> {
  constructor(props: authProps, id?: ID) {
    super(props, id);
  }
}
