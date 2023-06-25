import { isNumber, isString } from 'class-validator';
import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class DNI extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  private DNINumber(validDNI: string): number {
    return Number(validDNI.substring(0, 8));
  }

  private DNILetter(validDNI: string): string {
    return validDNI.charAt(8);
  }

  public static isLetterValid(DNINumber: number, DNILetter: string): boolean {
    return DNILettersByPosition[DNINumber % 23] === DNILetter;
  }

  public static isLastDigitCharacter(DNI: string): boolean {
    return isString(DNI.charAt(8));
  }

  public static isFirstEightDigitsNumbers(DNI: string): boolean {
    const DNINumber = DNI.substring(0, 8);
    [...DNINumber].forEach((DNIElement) => {
      if (!isNumber(DNIElement)) return false;
    });
    return true;
  }

  protected validate({ value: DNIValue }: DomainPrimitive<string>): void {
    const correctFormatDNI =
      DNI.isFirstEightDigitsNumbers(DNIValue) &&
      DNI.isLastDigitCharacter(DNIValue);

    if (!correctFormatDNI)
      throw new Error(`DNI "${DNIValue}" has incorrect format`);

    const validDNI = DNI.isLetterValid(
      this.DNINumber(DNIValue),
      this.DNILetter(DNIValue),
    );
    if (!validDNI) throw new Error(`DNI ${DNIValue} is incorrect`);
  }
}

const DNILettersByPosition = [
  'T',
  'R',
  'W',
  'A',
  'G',
  'M',
  'Y',
  'F',
  'P',
  'D',
  'X',
  'B',
  'N',
  'J',
  'Z',
  'S',
  'Q',
  'V',
  'H',
  'L',
  'C',
  'K',
  'E',
];
