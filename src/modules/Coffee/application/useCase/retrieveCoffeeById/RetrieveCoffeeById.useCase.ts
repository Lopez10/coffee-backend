import {
  AppError,
  Either,
  ID,
  Result,
  UseCaseBase,
  left,
  right,
} from '@common';
import { Coffee } from '../../../domain/Coffee.entity';
import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/Coffee.repository.port';

export interface RetrieveCoffeeByIdRequestDTO {
  id: string;
}

type Response = Either<AppError.UnexpectedError, Result<Coffee>>;

export class RetrieveCoffeeByIdUseCase
  implements UseCaseBase<RetrieveCoffeeByIdRequestDTO, Promise<Response>>
{
  constructor(private readonly coffeeRepository: CoffeeRepositoryPort) {}

  async run(request?: RetrieveCoffeeByIdRequestDTO): Promise<Response> {
    try {
      const coffeeID = new ID(request.id);
      const coffee = await this.coffeeRepository.findOneById(coffeeID);

      return right(Result.ok<Coffee>(coffee));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
