import { Email, Entity, ID, Password } from '@common';

export interface authProps {
  email: Email;
  password: Password;
}

export class Auth extends Entity<authProps> {
  constructor(props: authProps, id?: ID) {
    super(props, id);
  }
}
