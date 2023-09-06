import { InvalidCoffeeExtraction } from '@common/exceptions';
import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class CoffeeExtraction extends ValueObject<string> {
  private static readonly validValues = {
    ESPRESSO: 'ESPRESSO',
    MOKA: 'MOKA',
    AEROPRESS: 'AEROPRESS',
    V60: 'V60',
    CHEMEX: 'CHEMEX',
    FRENCH_PRESS: 'FRENCH_PRESS',
  };
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
    if (
      !Object.values(CoffeeExtraction.validValues).includes(coffeeExtraction)
    ) {
      throw new InvalidCoffeeExtraction(coffeeExtraction);
    }
  }
}
