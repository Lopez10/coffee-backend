import { AppError, Either, Result, UseCaseBase, left, right } from '@common';
import { CoffeeDTO, CoffeeMapper } from '../../../Coffee.mapper';
import { Coffee } from '../../../domain/Coffee.entity';
import { CoffeeRepositoryPort } from '../../../domain/Coffee.repository.port';

type Response = Either<AppError.UnexpectedError, Result<Coffee>>;

export class UpdateCoffeeUseCase
  implements UseCaseBase<CoffeeDTO, Promise<Response>>
{
  constructor(private readonly coffeeRepository: CoffeeRepositoryPort) {}
  async run(request: CoffeeDTO): Promise<Response> {
    try {
      const coffee = CoffeeMapper.toDomain(request);

      const coffeeUpdated = await this.coffeeRepository.update(coffee);
      return right(Result.ok<Coffee>(coffeeUpdated));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
