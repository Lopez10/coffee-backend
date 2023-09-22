import {
  Name,
  Email,
  Password,
  Role,
  Description,
  CoffeeExtraction,
  ID,
} from '@common';
import { User } from '../../../modules/User/domain/User.entity';
import { UserRepositoryPort } from '../../../modules/User/domain/User.repository.port';

export function addUsersToRepository(userRepository: UserRepositoryPort) {
  userRepository.insertSome([
    User.create(
      {
        name: new Name('User 1'),
        email: new Email('user1@gmail.com'),
        password: new Password({ value: '123456Prueba', hashed: false }),
        role: new Role('USER'),
        description: new Description('User 1 description'),
        coffeeCounter: 0,
        coffeeExtraction: new CoffeeExtraction('AEROPRESS'),
        coffeeExtractionMachine: 'Lelit Bianca',
        coffeeGrinderMachine: 'Eureka Mignon',
      },
      new ID('user1'),
    ),
    User.create(
      {
        name: new Name('User 2'),
        email: new Email('user2@gmail.com'),
        password: new Password({ value: '123456Prueba', hashed: false }),
        role: new Role('USER'),
        description: new Description('User 2 description'),
        coffeeCounter: 0,
        coffeeExtraction: new CoffeeExtraction('AEROPRESS'),
        coffeeExtractionMachine: 'Lelit Bianca',
        coffeeGrinderMachine: 'Eureka Mignon',
      },
      new ID('user2'),
    ),
    User.create(
      {
        name: new Name('User 3'),
        email: new Email('user3@gmail.com'),
        password: new Password({ value: '123456Prueba', hashed: false }),
        role: new Role('USER'),
        description: new Description('User 3 description'),
        coffeeCounter: 0,
        coffeeExtraction: new CoffeeExtraction('ESPRESSO'),
        coffeeExtractionMachine: 'Lelit Bianca',
        coffeeGrinderMachine: 'Eureka Mignon',
      },
      new ID('user3'),
    ),
  ]);
}
