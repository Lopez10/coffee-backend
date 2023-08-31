import { Result } from '@common/Result';
import { UseCaseError } from '@common/UseCaseError';

export namespace LoginUserErrors {
  export class EmailDoesntExistError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} doesn't exist`,
      } as UseCaseError);
    }
  }

  export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The password doesn't match`,
      } as UseCaseError);
    }
  }
}
