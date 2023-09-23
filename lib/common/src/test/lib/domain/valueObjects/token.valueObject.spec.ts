import { Token } from '@common';

describe('Token test', () => {
  it(`
    GIVEN a secretKey, a userId and an email
    WHEN the token is generated
    THEN it should return a token
  `, () => {
    // GIVEN
    const email = 'prueba@prueba.com';
    const userId = 'userid1';

    // WHEN
    const token = Token.generate('test', userId, email);

    // THEN
    expect(token.isValid()).toBe(true);
    expect(
      token.getValue().startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'),
    ).toBeTruthy();
    expect(token.getEmail().value).toBe('prueba@prueba.com');
    expect(token.getUserId().value).toBe('userid1');
  });
});
