import {
  AppError,
  Either,
  Paginated,
  Result,
  UseCaseBase,
  left,
  right,
} from '@common';
import { Coffee } from '../../../domain/Coffee.entity';
import { CoffeeRepositoryPort } from '../../../domain/Coffee.repository.port';

export interface RetrieveCoffeesDTO {
  name?: string;
  origin?: string;
  height?: number;
  roast?: string;
  userId?: string;
}

type Response = Either<AppError.UnexpectedError, Result<Paginated<Coffee>>>;

export class RetrieveCoffeesUseCase
  implements UseCaseBase<RetrieveCoffeesDTO, Promise<Response>>
{
  constructor(private readonly coffeeRepository: CoffeeRepositoryPort) {}

  async run(request?: RetrieveCoffeesDTO): Promise<Response> {
    try {
      const coffee = await this.coffeeRepository.findPaginatedByCriteria(
        request,
        {
          page: 1,
          limit: 10,
          offset: 0,
          orderBy: { field: 'createdAt', param: 'asc' },
        },
      );
      return right(Result.ok<Paginated<Coffee>>(coffee));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
