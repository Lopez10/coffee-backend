import { AppError, Either, Result, UseCase, left, right } from '@common';
import { Coffee } from 'src/modules/Coffee/domain/Coffee.entity';
import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/coffee.repository.port';

export interface RetrieveCoffeesDTO {
  name?: string;
  origin?: string;
  height?: number;
  roast?: string;
  userId?: string;
}

type Response = Either<AppError.UnexpectedError, Result<Coffee[]>>;

export class RetrieveCoffeeUseCase
  implements UseCase<RetrieveCoffeesDTO, Promise<Response>>
{
  constructor(private readonly coffeeRepository: CoffeeRepositoryPort) {}

  async run(request?: RetrieveCoffeesDTO): Promise<Response> {
    const coffeeValues = {
      name: request?.name,
      origin: request?.origin,
      height: request?.height,
      roast: request?.roast,
      userId: request?.userId,
    };

    try {
      const coffee = await this.coffeeRepository.findByCriteria(coffeeValues);
      return right(Result.ok<Coffee[]>(coffee));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
