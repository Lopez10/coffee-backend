import { UseCase } from '@common';
import { Coffee } from 'src/modules/Coffee/domain/Coffee.entity';
import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/coffee.repository.port';

export interface RetrieveCoffeesDTO {
  name?: string;
  origin?: string;
  height?: number;
  roast?: string;
  userId?: string;
}
export class RetrieveCoffeeUseCase
  implements UseCase<RetrieveCoffeesDTO, Promise<Coffee[]>>
{
  constructor(private readonly coffeeRepository: CoffeeRepositoryPort) {}

  async run(request?: RetrieveCoffeesDTO): Promise<Coffee[]> {
    const coffeeValues = {
      name: request?.name,
      origin: request?.origin,
      height: request?.height,
      roast: request?.roast,
      userId: request?.userId,
    };

    const coffee = await this.coffeeRepository.findByCriteria(coffeeValues);
    return coffee;
  }
}
