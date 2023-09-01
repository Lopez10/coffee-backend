import { InvalidRoleException } from '@common/exceptions';
import { ValueObject } from '../valueObject.base';

export class Role extends ValueObject<string> {
  private static readonly validValues = {
    ADMIN: 'ADMIN',
    USER: 'USER',
  };
  constructor(value: string) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  public static createAdmin(): Role {
    return new Role(Role.validValues.ADMIN);
  }

  public static createUser(): Role {
    return new Role(Role.validValues.USER);
  }

  get value(): string {
    return this.props.value;
  }

  isAdmin(): boolean {
    return this.value === Role.validValues.ADMIN;
  }

  isUser(): boolean {
    return this.value === Role.validValues.USER;
  }

  protected validate({ value: role }): void {
    if (!Object.values(Role.validValues).includes(role)) {
      throw new InvalidRoleException(role);
    }
  }
}
