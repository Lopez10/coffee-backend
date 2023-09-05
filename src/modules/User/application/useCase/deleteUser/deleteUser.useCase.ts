import { AppError, Either, ID, UseCase, left, right } from '@common';
import { UserRepositoryPort } from 'src/modules/User/domain/User.repository.port';

type Response = Either<AppError.UnexpectedError, boolean>;

export class DeleteUserUseCase implements UseCase<string, Promise<Response>> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async run(id: string): Promise<Response> {
    try {
      await this.userRepository.delete(new ID(id));
      return right(true);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
