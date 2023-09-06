import { InvalidRoastError } from '@common/exceptions';
import { ValueObject } from '../valueObject.base';

export class Roast extends ValueObject<string> {
  private static readonly validValues = {
    LIGHT: 'LIGHT',
    MEDIUM: 'MEDIUM',
    DARK: 'DARK',
  };
  constructor(value: string) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value: roast }: { value: string }): void {
    if (!Object.values(Roast.validValues).includes(roast)) {
      throw new InvalidRoastError(roast);
    }
  }
}
