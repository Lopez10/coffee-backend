import { Name, Roast, ID } from '@common';
import { Coffee } from '../../../modules/Coffee/domain/Coffee.entity';
import { CoffeeRepositoryPort } from '../../../modules/Coffee/domain/Coffee.repository.port';

export function addCoffeeToRepository(coffeeRepository: CoffeeRepositoryPort) {
  coffeeRepository.insertSome([
    Coffee.create(
      {
        name: new Name('Café 1'),
        origin: 'Peru',
        height: 1000,
        roast: new Roast('LIGHT'),
        userId: new ID('User1'),
      },
      new ID('Coffee1'),
    ),
    Coffee.create(
      {
        name: new Name('Café 2'),
        origin: 'El Salvador',
        height: 1000,
        roast: new Roast('DARK'),
        userId: new ID('User1'),
      },
      new ID('Coffee2'),
    ),
    Coffee.create(
      {
        name: new Name('Café 3'),
        origin: 'Peru',
        height: 2500,
        roast: new Roast('MEDIUM'),
        userId: new ID('User1'),
      },
      new ID('Coffee3'),
    ),
  ]);
}
