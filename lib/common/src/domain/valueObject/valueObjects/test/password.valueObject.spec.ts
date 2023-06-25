import { Password } from '../password.valueObject';

describe('Password value object test', () => {
  const passwordInvalid = '123';
  const key = 'test';

  it(`
    GIVEN a text with numbers, uppercase and lowercase
    AND a length between 8 and 50
    WHEN I write the valid password
    THEN the password value object is created
    AND the password decrypted is the same of the initial password
  `, () => {
    // GIVEN
    const passwordValid = '1234PasswordValid';

    // WHEN
    const newPassword = new Password(passwordValid, key);

    const passwordDecrypted = Password.decryptPassword(
      newPassword.props.value,
      key,
    );

    // THEN
    expect(passwordDecrypted).toEqual(passwordValid);
  });
});
