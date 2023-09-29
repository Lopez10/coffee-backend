import { Result, UseCaseError } from '@common';

export namespace UpdateCoffeeErrors {
  export class NotAllowedToUpdate extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `You are not allowed to update this coffee`,
      } as UseCaseError);
    }
  }
}
