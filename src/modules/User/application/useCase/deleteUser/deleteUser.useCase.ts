import { AppError, Either, UseCase, left, right } from '@common';
import { UserRepositoryPort } from 'src/modules/User/domain/user.repository.port';
import { UserDTO } from 'src/modules/User/user.mapper';

type Response = Either<AppError.UnexpectedError, boolean>;

export class DeleteUserUseCase implements UseCase<UserDTO, Promise<Response>> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async run(request: UserDTO): Promise<Response> {
    try {
      await this.userRepository.delete(request.id);
      return right(true);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
