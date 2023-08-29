import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/coffee.repository.port';
import { CreateCoffee } from './createCoffee.useCase';

describe('Create Coffee', () => {
  let coffeeRepositoryPort: CoffeeRepositoryPort;

  it(`
    GIVEN 
    WHEN 
    THEN 
    `, () => {
    const action = new CreateCoffee(coffeeRepositoryPort);
    const insertSpy = jest.spyOn(coffeeRepositoryPort, 'insert');

    action.run({
      name: 'test',
      origin: 'test',
      height: 1,
      roast: 'test',
      userId: 'test',
    });

    expect(insertSpy).toBeCalledTimes(1);
  });
});
