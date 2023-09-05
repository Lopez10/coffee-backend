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
  Role,
} from '@common';
import { CreateUserErrors } from './CreateUser.errors';
import { UserRepositoryPort } from '../../../domain/User.repository.port';
import { User } from '../../../domain/User.entity';
import { UserDTO } from '../../../user.mapper';

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | CreateUserErrors.AdminCannotBeCreatedError
  | AppError.UnexpectedError,
  Result<void>
>;

export class CreateUserUseCase implements UseCase<UserDTO, Promise<Response>> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async run(request: UserDTO): Promise<Response> {
    const email = new Email(request.email);
    const role = new Role(request.role);
    const userValues = {
      email,
      password: new Password(request.password),
      name: new Name(request.name),
      description: new Description(request.description),
      role,
    };
    const user = User.create(userValues);

    try {
      const userAlreadyExists = await this.userRepository.findOneByEmail(email);
      if (userAlreadyExists) {
        return left(new CreateUserErrors.EmailAlreadyExistsError(email.value));
      }

      if (role.isAdmin()) {
        return left(new CreateUserErrors.AdminCannotBeCreatedError());
      }

      await this.userRepository.insert(user);
      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
