import { AppError, Either, ID, UseCaseBase, left, right } from '@common';
import { User } from 'src/modules/User/domain/User.entity';
import { UserRepositoryPort } from 'src/modules/User/domain/User.repository.port';

export interface RetrieveUserDTO {
  id: string;
}

type Response = Either<AppError.UnexpectedError, User>;

export class RetrieveUserUseCase
  implements UseCaseBase<RetrieveUserDTO, Promise<Response>>
{
  constructor(private readonly userRepository: UserRepositoryPort) {}
  async run(retrieveUserDTO: RetrieveUserDTO): Promise<Response> {
    try {
      const id = new ID(retrieveUserDTO.id);
      const user = await this.userRepository.findOneById(id);
      return right(user);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
