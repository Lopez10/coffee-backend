import { DomainPrimitive, ValueObject } from '../valueObject.base';

export type orientationType = 'south' | 'west' | 'east' | 'north';

export class Orientation extends ValueObject<orientationType> {
  constructor(value: orientationType) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): orientationType {
    return this.props.value;
  }

  protected validate({
    value: orientation,
  }: DomainPrimitive<orientationType>): void {
    if (typeof orientation === undefined) {
      throw new Error(`Name "${orientation}" is too long`);
    }
  }
}
