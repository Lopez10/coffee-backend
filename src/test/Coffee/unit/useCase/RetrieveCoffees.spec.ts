import { CoffeeRepositoryPort } from '../../../../modules/Coffee/domain/Coffee.repository.port';
import { MockCoffeeRepository } from '../../repository/MockCoffeeRepository';
import { RetrieveCoffeesUseCase } from '../../../../modules/Coffee/application/useCase/retrieveCoffees/RetrieveCoffees.useCase';
import { addCoffeeToRepository } from '../../repository/MockCoffeeData';

const coffeeRepository: CoffeeRepositoryPort = new MockCoffeeRepository();
addCoffeeToRepository(coffeeRepository);
const action = new RetrieveCoffeesUseCase(coffeeRepository);

describe('Retrieve Coffees', () => {
  it(`
    GIVEN There are 3 coffees 
    WHEN I retrieve all the coffees with the name 'Café 1'
    THEN I get the only coffee with that name
  `, async () => {
    const coffees = await action.run({
      name: 'Café 1',
    });

    expect(coffees.isRight()).toEqual(true);
    if (coffees.isRight()) {
      expect(coffees.value.getValue().count).toEqual(1);
      expect(coffees.value.getValue().data[0].toPrimitives().name).toEqual(
        'Café 1',
      );
    }
  });

  it(`
    GIVEN I have 3 coffees 
    WHEN I retrieve all the coffees
    THEN I get all the coffees
  `, async () => {
    const coffees = await action.run();

    expect(coffees.isRight()).toEqual(true);
    if (coffees.isRight()) {
      expect(coffees.value.getValue().count).toEqual(3);
    }
  });

  it(`
    GIVEN I have 3 coffees 
    WHEN I retrieve all the coffees from Perú with the name 'Café 3'
    THEN I get all the coffees from Perú with the name 'Café 3'
  `, async () => {
    const coffees = await action.run({
      origin: 'Peru',
      name: 'Café 3',
    });

    expect(coffees.isRight()).toEqual(true);
    if (coffees.isRight()) {
      expect(coffees.value.getValue().count).toEqual(1);
      expect(coffees.value.getValue().data[0].toPrimitives().name).toEqual(
        'Café 3',
      );
      expect(coffees.value.getValue().data[0].toPrimitives().origin).toEqual(
        'Peru',
      );
    }
  });
});
