import { isPhoneNumber } from 'class-validator';
import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class Phone extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value: phone }: DomainPrimitive<string>): void {
    if (!isPhoneNumber(phone)) {
      throw new Error(`Phone "${phone}" has incorrect format`);
    }
  }
}
