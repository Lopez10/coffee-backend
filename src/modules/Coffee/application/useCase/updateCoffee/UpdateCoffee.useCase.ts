import { AppError, Either, Result, UseCaseBase, left, right } from '@common';
import { CoffeeDTO, CoffeeMapper } from '../../../Coffee.mapper';
import { Coffee } from '../../../domain/Coffee.entity';
import { CoffeeRepositoryPort } from '../../../domain/Coffee.repository.port';
import { UpdateCoffeeErrors } from './UpdateCoffee.error';

type Response = Either<AppError.UnexpectedError, Result<Coffee>>;

export interface UpdateCoffeeDTO {
  coffeeDTO: CoffeeDTO;
  userId: string;
}
export class UpdateCoffeeUseCase
  implements UseCaseBase<UpdateCoffeeDTO, Promise<Response>>
{
  constructor(private readonly coffeeRepository: CoffeeRepositoryPort) {}
  async run({ coffeeDTO, userId }: UpdateCoffeeDTO): Promise<Response> {
    try {
      if (userId !== coffeeDTO.userId) {
        return left(new UpdateCoffeeErrors.NotAllowedToUpdate());
      }
      const coffee = CoffeeMapper.toDomain(coffeeDTO);

      const coffeeUpdated = await this.coffeeRepository.update(coffee);
      return right(Result.ok<Coffee>(coffeeUpdated));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
