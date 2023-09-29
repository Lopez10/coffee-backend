import {
  UpdateCoffeeDTO,
  UpdateCoffeeUseCase,
} from '../../../../modules/Coffee/application/useCase/updateCoffee/UpdateCoffee.useCase';
import { CoffeeRepositoryPort } from '../../../../modules/Coffee/domain/Coffee.repository.port';
import { addCoffeeToRepository } from '../../repository/MockCoffeeData';
import { MockCoffeeRepository } from '../../repository/MockCoffeeRepository';
import { ID } from '@common';

describe('Update Coffee', () => {
  it(`
      GIVEN an existing coffee with the user id 'User1'
      WHEN the coffee is updated by the user 'User1'
      THEN the coffee should be updated
    `, async () => {
    const { action, coffeeRepository } = prepareTest();

    // GIVEN
    const coffeeRequestData: UpdateCoffeeDTO = {
      coffeeDTO: {
        id: 'Coffee1',
        name: 'Café 1 updated',
        origin: 'Peru updated',
        height: 1001,
        roast: 'MEDIUM',
        userId: 'User1',
      },
      userId: 'User1',
    };
    // WHEN
    const updateCoffeeById = await action.run(coffeeRequestData);
    expect(updateCoffeeById.isRight()).toEqual(true);
    expect(updateCoffeeById.isLeft()).toEqual(false);
    // THEN

    const coffee = await coffeeRepository.findOneById(
      new ID(coffeeRequestData.coffeeDTO.id),
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

  it(`
      GIVEN an existing coffee with the user id 'User1'
      WHEN the coffee is updated by the user 'User2'
      THEN the coffee should not be updated
    `, async () => {
    const { action, coffeeRepository } = prepareTest();

    // GIVEN
    const coffeeRequestData: UpdateCoffeeDTO = {
      coffeeDTO: {
        id: 'Coffee1',
        name: 'Café 1 updated',
        origin: 'Peru updated',
        height: 1001,
        roast: 'MEDIUM',
        userId: 'User1',
      },
      userId: 'User2',
    };
    // WHEN
    const updateCoffeeById = await action.run(coffeeRequestData);
    expect(updateCoffeeById.isRight()).toEqual(false);
    expect(updateCoffeeById.isLeft()).toEqual(true);
    // THEN

    const coffee = await coffeeRepository.findOneById(
      new ID(coffeeRequestData.coffeeDTO.id),
    );
    if (updateCoffeeById.isLeft()) {
      const coffeePrimitive = coffee.toPrimitives();
      expect(coffeePrimitive.name).toEqual('Café 1');
      expect(coffeePrimitive.origin).toEqual('Peru');
      expect(coffeePrimitive.height).toEqual(1000);
      expect(coffeePrimitive.roast).toEqual('LIGHT');
      expect(coffeePrimitive.userId).toEqual('User1');
    }
  });
});

function prepareTest() {
  const coffeeRepository: CoffeeRepositoryPort = new MockCoffeeRepository();
  addCoffeeToRepository(coffeeRepository);
  const action = new UpdateCoffeeUseCase(coffeeRepository);

  return { action, coffeeRepository };
}
