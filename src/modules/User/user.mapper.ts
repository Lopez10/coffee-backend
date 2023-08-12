import { User } from './domain/User.entity';
import { User as UserModel } from '@prisma/client';
import { Description, Email, ID, Name, Password, extraction } from '@common';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  birthDate: Date;
  coffeeCounter: number;
  coffeeExtraction: extraction;
  coffeeGrinderMachine: string;
  coffeeExtractionMachine: string;
}

export class UserMapper {
  static toDomain(user: UserModel): User {
    return User.create(
      {
        name: new Name(user.name),
        email: new Email(user.email),
        password: new Password(user.password),
        description: new Description(user.description),
        birthDate: user.birthDate,
        coffeeCounter: user.coffeeCounter,
        coffeeExtraction: user.coffeeExtraction as extraction,
        coffeeGrinderMachine: user.coffeeGrinderMachine,
        coffeeExtractionMachine: user.coffeeExtractionMachine,
      },
      new ID(user.id),
    );
  }
  static toDTO(entity: User): UserDTO {
    return entity.toPrimitives();
  }
}
