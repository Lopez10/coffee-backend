import { UseCase } from '@common/useCase.base';
import { User } from '../domain/User.entity';
import { UserRepositoryPort } from '../repo/user.repository';
import { Description, Email, Name, Password } from '@common';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  description: string;
  birthDate: number;
}

type Response = void;

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
    await this.userRepository.insert(user);
  }
}
