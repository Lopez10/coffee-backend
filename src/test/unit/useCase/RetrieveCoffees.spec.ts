import { ID, Name } from '@common';
import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/Coffee.repository.port';
import { RetrieveCoffeesUseCase } from '../../../modules/Coffee/application/useCase/retrieveCoffees/RetrieveCoffees.useCase';
import { MockCoffeeRepository } from '../../repository/MockCoffeeRepository';
import { Coffee } from '../../../modules/Coffee/domain/Coffee.entity';

const coffeeRepository: CoffeeRepositoryPort = new MockCoffeeRepository();
addCoffeeToRepository(coffeeRepository);
const action = new RetrieveCoffeesUseCase(coffeeRepository);

describe('Retrieve Coffees', () => {
  it(`
    GIVEN I have 3 coffees 
    WHEN I retrieve all the coffees with the name 'Café 1'
    THEN I get the only coffee with that name
  `, async () => {
    const coffees = await action.run({
      name: 'Café 1',
    });

    expect(coffees.isRight()).toEqual(true);
    if (coffees.isRight()) {
      expect(coffees.value.getValue().length).toEqual(1);
      expect(coffees.value.getValue()[0]).toBeInstanceOf(Coffee);
      expect(coffees.value.getValue()[0].toPrimitives().name).toEqual('Café 1');
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
      expect(coffees.value.getValue().length).toEqual(3);
    }
  });
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
    expect(coffees.value.getValue().length).toEqual(1);
    expect(coffees.value.getValue()[0]).toBeInstanceOf(Coffee);
    expect(coffees.value.getValue()[0].toPrimitives().name).toEqual('Café 3');
    expect(coffees.value.getValue()[0].toPrimitives().origin).toEqual('Peru');
  }
});

function addCoffeeToRepository(coffeeRepository: CoffeeRepositoryPort) {
  coffeeRepository.insertSome([
    Coffee.create(
      {
        name: new Name('Café 1'),
        origin: 'Peru',
        height: 1000,
        roast: 'light',
        userId: new ID('User1'),
      },
      new ID('Coffee1'),
    ),
    Coffee.create(
      {
        name: new Name('Café 2'),
        origin: 'El Salvador',
        height: 1000,
        roast: 'dark',
        userId: new ID('User1'),
      },
      new ID('Coffee2'),
    ),
    Coffee.create(
      {
        name: new Name('Café 3'),
        origin: 'Peru',
        height: 2500,
        roast: 'medium',
        userId: new ID('User1'),
      },
      new ID('Coffee3'),
    ),
  ]);
}
