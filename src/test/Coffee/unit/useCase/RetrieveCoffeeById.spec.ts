import { RetrieveCoffeeByIdUseCase } from '../../../../modules/Coffee/application/useCase/retrieveCoffeeById/RetrieveCoffeeById.useCase';
import { CoffeeRepositoryPort } from '../../../../modules/Coffee/domain/Coffee.repository.port';
import { MockCoffeeRepository } from '../../repository/MockCoffeeRepository';
import { addCoffeeToRepository } from '../../repository/MockCoffeeData';

const coffeeRepository: CoffeeRepositoryPort = new MockCoffeeRepository();
addCoffeeToRepository(coffeeRepository);
const action = new RetrieveCoffeeByIdUseCase(coffeeRepository);

describe('Retrieve Coffee by ID', () => {
  it(`
        GIVEN an existing coffee
        WHEN the coffee is retrieved by ID
        THEN the coffee should be retrieved
    `, async () => {
    // GIVEN
    const coffeeRequestData = {
      id: 'Coffee1',
    };
    // WHEN
    const retrieveCoffeeById = await action.run(coffeeRequestData);
    expect(retrieveCoffeeById.isRight()).toEqual(true);

    // THEN
    if (retrieveCoffeeById.isRight()) {
      const coffee = retrieveCoffeeById.value.getValue();
      const coffeePrimitive = coffee.toPrimitives();
      expect(coffeePrimitive.name).toEqual('Café 1');
      expect(coffeePrimitive.origin).toEqual('Peru');
      expect(coffeePrimitive.height).toEqual(1000);
      expect(coffeePrimitive.roast).toEqual('LIGHT');
      expect(coffeePrimitive.userId).toEqual('User1');
    }
  });
});
