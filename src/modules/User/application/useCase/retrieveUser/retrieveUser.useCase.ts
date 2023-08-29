import { AppError, Either, UseCase, left, right } from '@common';
import { User } from 'src/modules/User/domain/User.entity';
import { UserRepositoryPort } from 'src/modules/User/domain/user.repository.port';

type Response = Either<AppError.UnexpectedError, User>;

export class RetrieveUserUseCase implements UseCase<string, Promise<Response>> {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  async run(id: string): Promise<Response> {
    try {
      const user = await this.userRepository.findOneById(id);
      return right(user);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
