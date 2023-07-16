import { UseCase } from '@common/useCase.base';
import { User } from '../domain/User.entity';
import { UserRepositoryPort } from '../repository/user.repository.port';
import { Description, Email, Name, Password } from '@common';
import { left, right } from 'lib/Result';
import { AppError } from '@common/AppError';
import { CreateUserErrors } from './createUser.errors';
import { Either, Result } from '@common/Result';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  description: string;
  birthDate: number;
}

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>>
{
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async run(request: CreateUserDTO): Promise<Response> {
    const email = new Email(request.email);
    const password = new Password(request.password);
    const name = new Name(request.name);
    const description = new Description(request.description);

    const userValues = {
      email,
      password,
      name,
      description,
      birthDate: request.birthDate,
    };
    const user = User.create(userValues);

    try {
      const userAlreadyExists = await this.userRepository.findOneByEmail(
        email.value,
      );
      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.EmailAlreadyExistsError(email.value),
        ) as Response;
      }

      await this.userRepository.insert(user);
      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error)) as Response;
    }
  }
}
