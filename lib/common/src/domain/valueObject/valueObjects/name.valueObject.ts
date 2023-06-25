import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class Name extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value: name }: DomainPrimitive<string>): void {
    if (name.length > 50) {
      throw new Error(`Name "${name}" is too long`);
    }
  }
}
