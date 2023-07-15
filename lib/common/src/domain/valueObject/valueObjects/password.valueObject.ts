import { DomainPrimitive, ValueObject } from '../valueObject.base';
import { AES } from 'crypto-ts';
import * as CryptoTS from 'crypto-ts';
import { passwordValidations } from './validations';

export class Password extends ValueObject<string> {
  constructor(value: string, key?: string) {
    super({ value });
    this.validate({ value });
    this.props.value = Password.encryptPassword(value, key);
  }

  protected validate({ value: password }: DomainPrimitive<string>): void {
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

  static encryptPassword(password: string, encryptKey?: string): string {
    if (process.env.ENCRYPT_KEY || encryptKey) {
      const encryptedPassword = AES.encrypt(
        password,
        process.env.ENCRYPT_KEY || encryptKey,
      );
      return encryptedPassword.toString();
    }
    return '';
  }

  static decryptPassword(password: string, decryptKey?: string): string {
    if (process.env.ENCRYPT_KEY || decryptKey) {
      const encryptedPassword = AES.decrypt(
        password,
        decryptKey || process.env.ENCRYPT_KEY,
      );
      return encryptedPassword.toString(CryptoTS.enc.Utf8);
    }
    return '';
  }

  get value(): string {
    return this.props.value;
  }
}
