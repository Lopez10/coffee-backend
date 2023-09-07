import { AppError, Either, ID, UseCaseBase, left, right } from '@common';
import { UserRepositoryPort } from 'src/modules/User/domain/User.repository.port';

export interface DeleteUserDTO {
  id: string;
}

type Response = Either<AppError.UnexpectedError, boolean>;

export class DeleteUserUseCase
  implements UseCaseBase<DeleteUserDTO, Promise<Response>>
{
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async run(deleteUserDTO: DeleteUserDTO): Promise<Response> {
    try {
      const id = new ID(deleteUserDTO.id);
      await this.userRepository.delete(id);
      return right(true);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
