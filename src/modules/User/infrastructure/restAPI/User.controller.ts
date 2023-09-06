import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../../user.mapper';
import { UserRepositoryPort } from '../../domain/User.repository.port';
import { UserPostgresRepository } from '../repository/User.postgres.repository';
import { CreateUserUseCase } from '../../application/useCase/createUser/CreateUser.useCase';

@Controller('users')
export class UserController {
  private userRepository: UserRepositoryPort;
  constructor() {
    this.userRepository = new UserPostgresRepository();
  }
  @Post()
  async createUser(@Body() userDTO: UserDTO) {
    const useCase = new CreateUserUseCase(this.userRepository);
    try {
      const result = await useCase.run(userDTO);
      if (result.isLeft()) {
        return result.value.getErrorValue().message;
      }
      return result.value.getValue();
    } catch (error) {
      return error.message;
    }
  }
}
