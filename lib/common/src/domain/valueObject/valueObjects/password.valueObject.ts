import { ValueObject } from '../valueObject.base';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export interface PasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  constructor(props: PasswordProps) {
    super(props);
    if (!props.hashed) {
      this.validate(props);
      props.value = Password.encryptPassword(props.value);
      props.hashed = true;
    }
  }

  get value(): string {
    return this.props.value;
  }

  get hashed(): boolean {
    return this.props.hashed;
  }

  public comparePassword(plainTextPassword: string): boolean {
    return this.hashed
      ? compareSync(plainTextPassword, this.value)
      : this.props.value === plainTextPassword;
  }

  protected validate({ value: password, hashed }: PasswordProps): void {
    if (hashed) {
      return;
    }

    const { haveDigits, haveUppercaseAndLowercase, maxLength, minLength } =
      passwordValidations;

    const validPassword =
      haveDigits(password) &&
      haveUppercaseAndLowercase(password) &&
      maxLength(password, 50) &&
      minLength(password, 8);

    if (!validPassword) {
      throw new Error('Password has incorrect');
    }
  }

  static encryptPassword(password: string): string {
    const rounds = 12;
    const salt = genSaltSync(rounds);

    const hashedText = hashSync(password, salt);

    return hashedText;
  }
}

export const passwordValidations = {
  minLength: (password: string, minLength: number): boolean => {
    return password.length >= minLength;
  },

  maxLength: (password: string, maxLength: number): boolean => {
    return password.length < maxLength;
  },

  haveUppercaseAndLowercase: (password: string): boolean => {
    let uppercase = false;
    let lowercase = false;

    for (let index = 0; index < password.length; index++) {
      if (
        !uppercase &&
        password.charAt(index) === password.charAt(index).toUpperCase()
      ) {
        uppercase = true;
      }

      if (
        !lowercase &&
        password.charAt(index) === password.charAt(index).toLowerCase()
      ) {
        lowercase = true;
      }

      if (uppercase && lowercase) {
        return true;
      }
    }
    return false;
  },

  haveDigits: (password: string): boolean => {
    return /\d/.test(password);
  },
};
