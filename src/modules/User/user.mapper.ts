import { User } from './domain/User.entity';
import {
  CoffeeExtraction,
  Description,
  Email,
  ID,
  Name,
  Password,
  Role,
} from '@common';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  description: string;
  coffeeCounter: number;
  coffeeExtraction: string;
  coffeeGrinderMachine: string;
  coffeeExtractionMachine: string;
}

export class UserMapper {
  static toDomain(user: UserDTO): User {
    return User.create(
      {
        name: new Name(user.name),
        email: new Email(user.email),
        password: new Password(user.password),
        role: new Role(user.role),
        description: new Description(user.description),
        coffeeCounter: user.coffeeCounter,
        coffeeExtraction: new CoffeeExtraction(user.coffeeExtraction),
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
