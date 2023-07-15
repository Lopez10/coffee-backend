import { Mapper } from '@common/domain/mapper.interface';
import { User } from './domain/User.entity';
import { UserModel, userSchema } from './repository/user.repository';
import { Description, Email, ID, Name, Password, extraction } from '@common';
import { UserDTO } from './dtos/user.DTO';

export class UserMapper implements Mapper<User> {
  toPersistence(entity: User): UserModel {
    const record: UserModel = entity.toPrimitives();
    return userSchema.parse(record);
  }
  toDomain(record: UserModel): User {
    return User.create(
      {
        name: new Name(record.name),
        email: new Email(record.email),
        password: new Password(record.password),
        description: new Description(record.description),
        birthDate: record.birthDate,
        coffeeCounter: record.coffeeCounter,
        coffeeExtraction: record.coffeeExtraction as extraction,
        coffeeGrinderMachine: record.coffeeGrinderMachine,
        coffeeExtractionMachine: record.coffeeExtractionMachine,
      },
      new ID(record.id),
    );
  }
  toResponse(entity: User): UserDTO {
    return entity.toPrimitives();
  }
}
