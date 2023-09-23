import { Password } from '@common';

describe('Password value object test', () => {
  it(`
    GIVEN a text with numbers, uppercase and lowercase
    AND a length between 8 and 50
    WHEN I write the valid password
    THEN the password value object is created
  `, () => {
    // GIVEN
    const passwordValid = '1234PasswordValid';

    // WHEN
    const newPassword = new Password({ value: passwordValid });
    expect(newPassword.hashed).toBeTruthy();

    // THEN
    expect(newPassword.comparePassword('1234PasswordValid')).toBeTruthy();
    expect(newPassword.comparePassword('1234Password')).toBeFalsy();
  });
});
