import { DNI } from '@common/domain/valueObject/valueObjects/DNI.valueObject';
import 'jest';

describe('DNI Value object test', () => {
  const DNIValid = '12345678Z';
  const DNIInvalid = '12345678X';

  it(`
    GIVEN a string with 8 numbers
    AND the corresponding letter
    WHEN I create a DNI with these values
    THEN the value object is created with DNI as a value
  `, () => {
    const newDNI = new DNI(DNIValid);
    const resultDNI = {
      props: {
        value: DNIValid,
      },
    };
    expect(newDNI).toEqual(resultDNI);
  });

  it(`
    GIVEN a string with 8 numbers
    AND a letter that does not match
    WHEN I create a DNI with these values
    THEN the value object is not created
    AND throw an error
  `, () => {
    expect(() => new DNI(DNIInvalid)).toThrow(`DNI ${DNIInvalid} is incorrect`);
  });

  it(`
    GIVEN a string with 8 numbers
    AND the corresponding letter
    WHEN I call to valid if the last digit is a caracter
    THEN is true
  `, () => {
    const isLastCaracter = DNI.isLastDigitCharacter(DNIValid);
    expect(isLastCaracter).toBe(true);
  });

  it(`
    GIVEN a string with 8 numbers
    AND the corresponding letter
    WHEN I call to valid if the first 8 digits are numbers
    THEN is true
  `, () => {
    const isLastCaracter = DNI.isFirstEightDigitsNumbers(DNIValid);
    expect(isLastCaracter).toBe(true);
  });

  it(`
    GIVEN a string with 8 numbers
    AND a letter that does not match
    WHEN I test if the letter is valid
    THEN the method returns false
  `, () => {
    const isLetterValid = DNI.isLetterValid(12345678, 'X');
    expect(isLetterValid).toBe(false);
  });

  it(`
    GIVEN a string with 8 numbers
    AND a match letter
    WHEN I test if the letter is valid
    THEN the method returns true
  `, () => {
    const isLetterValid = DNI.isLetterValid(12345678, 'Z');
    expect(isLetterValid).toBe(true);
  });
});
