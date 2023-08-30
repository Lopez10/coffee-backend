import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/coffee.repository.port';
import { RetrieveCoffeeUseCase } from './retrieveCoffees.useCase';

describe('prueba', () => {
  it('prueba', () => {
    let retrieveCoffees: CoffeeRepositoryPort;
    const action = new RetrieveCoffeeUseCase(retrieveCoffees);
    expect(1).toBe(1);
  });
});
