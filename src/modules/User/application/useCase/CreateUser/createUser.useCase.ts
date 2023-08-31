import {
  Description,
  Email,
  Name,
  Password,
  UseCase,
  AppError,
  Either,
  Result,
  left,
  right,
} from '@common';
import { CreateUserErrors } from './CreateUser.errors';
import { UserRepositoryPort } from '../../../domain/User.repository.port';
import { User } from '../../../domain/User.entity';
import { UserDTO } from 'src/modules/User/user.mapper';

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError,
  Result<void>
>;

export class CreateUserUseCase implements UseCase<UserDTO, Promise<Response>> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async run(request: UserDTO): Promise<Response> {
    const email = new Email(request.email);

    const userValues = {
      email,
      password: new Password(request.password),
      name: new Name(request.name),
      description: new Description(request.description),
      accessToken: null,
    };
    const user = User.create(userValues);

    try {
      const userAlreadyExists = await this.userRepository.findOneByEmail(
        email.value,
      );
      if (userAlreadyExists) {
        return left(new CreateUserErrors.EmailAlreadyExistsError(email.value));
      }

      await this.userRepository.insert(user);
      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
