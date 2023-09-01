import { User } from './domain/User.entity';
import { User as UserModel } from '@prisma/client';
import {
  Description,
  Email,
  ID,
  Name,
  Password,
  Role,
  extraction,
} from '@common';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  role: string;
  coffeeCounter: number | null;
  coffeeExtraction: extraction | null;
  coffeeGrinderMachine: string | null;
  coffeeExtractionMachine: string | null;
}

export class UserMapper {
  static toDomain(user: UserModel): User {
    return User.create(
      {
        name: new Name(user.name),
        email: new Email(user.email),
        password: new Password(user.password),
        description: new Description(user.description),
        role: new Role(user.role),
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
