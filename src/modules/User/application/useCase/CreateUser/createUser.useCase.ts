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
import { CreateUserErrors } from './createUser.errors';
import { UserRepositoryPort } from '../../../domain/user.repository.port';
import { User } from '../../../domain/User.entity';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  description: string;
  birthDate: Date;
}

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError,
  Result<void>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>>
{
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async run(request: CreateUserDTO): Promise<Response> {
    const email = new Email(request.email);

    const userValues = {
      email,
      password: new Password(request.password),
      name: new Name(request.name),
      description: new Description(request.description),
      birthDate: request.birthDate,
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
