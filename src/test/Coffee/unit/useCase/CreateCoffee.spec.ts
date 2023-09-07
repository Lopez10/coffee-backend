import { CoffeeRepositoryPort } from '../../../../modules/Coffee/domain/Coffee.repository.port';
import { MockCoffeeRepository } from '../../repository/MockCoffeeRepository';
import { CreateCoffeeUseCase } from '../../../../modules/Coffee/application/useCase/createCoffee/CreateCoffee.useCase';
import { ID } from '@common';

const coffeeRepository: CoffeeRepositoryPort = new MockCoffeeRepository();
const action = new CreateCoffeeUseCase(coffeeRepository);

describe('Create Coffee', () => {
  it(`
        GIVEN a new Peru data coffee created by user1
        WHEN the coffee is created
        THEN the coffee should be created in the repository
    `, async () => {
    // GIVEN
    const coffeeRequestData = {
      name: 'Café 1',
      origin: 'Peru',
      height: 100,
      roast: 'LIGHT',
      userId: 'user1',
      id: 'coffee1',
    };

    // WHEN
    const coffeeCreationRequest = await action.run(coffeeRequestData);
    expect(coffeeCreationRequest.isRight()).toEqual(true);

    // THEN
    const coffee = await coffeeRepository.findOneById(new ID('coffee1'));
    expect(coffee).not.toBeNull();
    expect(coffee.toPrimitives().name).toEqual('Café 1');
    expect(coffee.toPrimitives().origin).toEqual('Peru');
    expect(coffee.toPrimitives().height).toEqual(100);
    expect(coffee.toPrimitives().roast).toEqual('LIGHT');
    expect(coffee.toPrimitives().userId).toEqual('user1');
  });
});
