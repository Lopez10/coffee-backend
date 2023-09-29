import { UpdateCoffeeUseCase } from '../../../../modules/Coffee/application/useCase/updateCoffee/UpdateCoffee.useCase';
import { CoffeeRepositoryPort } from '../../../../modules/Coffee/domain/Coffee.repository.port';
import { addCoffeeToRepository } from '../../repository/MockCoffeeData';
import { MockCoffeeRepository } from '../../repository/MockCoffeeRepository';
import { ID } from '@common';

const coffeeRepository: CoffeeRepositoryPort = new MockCoffeeRepository();
addCoffeeToRepository(coffeeRepository);
const action = new UpdateCoffeeUseCase(coffeeRepository);

describe('Update Coffee', () => {
  it(`
        GIVEN an existing coffee
        WHEN the coffee is updated
        THEN the coffee should be updated
    `, async () => {
    // GIVEN
    const coffeeRequestData = {
      id: 'Coffee1',
      name: 'Café 1 updated',
      origin: 'Peru updated',
      height: 1001,
      roast: 'MEDIUM',
      userId: 'User1',
    };
    // WHEN
    const updateCoffeeById = await action.run(coffeeRequestData);
    expect(updateCoffeeById.isRight()).toEqual(true);
    // THEN

    const coffee = await coffeeRepository.findOneById(
      new ID(coffeeRequestData.id),
    );
    if (updateCoffeeById.isRight()) {
      const coffeePrimitive = coffee.toPrimitives();
      expect(coffeePrimitive.name).toEqual('Café 1 updated');
      expect(coffeePrimitive.origin).toEqual('Peru updated');
      expect(coffeePrimitive.height).toEqual(1001);
      expect(coffeePrimitive.roast).toEqual('MEDIUM');
      expect(coffeePrimitive.userId).toEqual('User1');
    }
  });
});
