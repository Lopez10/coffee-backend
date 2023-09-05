import {
  AppError,
  Either,
  ID,
  Name,
  Result,
  UseCase,
  left,
  right,
  roast,
} from '@common';
import { CoffeeDTO } from '../../../Coffee.mapper';
import { Coffee } from '../../../domain/Coffee.entity';
import { CoffeeRepositoryPort } from '../../../domain/Coffee.repository.port';

type Response = Either<AppError.UnexpectedError, Result<void>>;

export class CreateCoffee implements UseCase<CoffeeDTO, Promise<Response>> {
  constructor(private readonly coffeeRepository: CoffeeRepositoryPort) {}

  async run(request: CoffeeDTO): Promise<Response> {
    const name = new Name(request.name);
    const coffeeDomain = Coffee.create(
      {
        name,
        origin: request.origin,
        height: request.height,
        roast: request.roast as roast,
        userId: new ID(request.userId),
      },
      new ID(request.id),
    );
    try {
      await this.coffeeRepository.insert(coffeeDomain);
      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
