import { UseCase } from '@common';
import { Coffee } from 'src/modules/Coffee/domain/Coffee.entity';
import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/coffee.repository.port';

export interface RetrieveCoffeeDTO {
  name?: string;
  origin?: string;
  height?: number;
  roast?: string;
}
export class RetrieveCoffeeUseCase
  implements UseCase<RetrieveCoffeeDTO, Promise<Coffee[]>>
{
  constructor(private readonly coffeeRepository: CoffeeRepositoryPort) {}

  async run(request?: RetrieveCoffeeDTO): Promise<Coffee[]> {
    const coffeeValues = {
      name: request?.name,
      origin: request?.origin,
      height: request?.height,
      roast: request?.roast,
    };

    const coffee = await this.coffeeRepository.findByCriteria(coffeeValues);
    return coffee;
  }
}
