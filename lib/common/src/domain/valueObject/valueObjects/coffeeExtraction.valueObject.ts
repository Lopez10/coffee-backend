import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class CoffeeExtraction extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({
    value: coffeeExtraction,
  }: DomainPrimitive<string>): void {
    if (typeof coffeeExtraction === undefined) {
      throw new Error(`Name "${coffeeExtraction}" is undefined`);
    }
  }
}
