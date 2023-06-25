import { isUUID } from 'class-validator';
import { v4 } from 'uuid';
import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class ID extends ValueObject<string> {
  constructor(value?: string) {
    super(value ? { value } : { value: v4() });
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate({ value: id }: DomainPrimitive<string>): void {
    if (!isUUID(id)) {
      throw new Error(`Incorrect ID format "${id}"`);
    }
  }
}
