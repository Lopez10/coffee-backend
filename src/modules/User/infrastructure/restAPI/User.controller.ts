import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../../user.mapper';
import { UserRepositoryPort } from '../../domain/User.repository.port';
import { UserPostgresRepository } from '../repository/User.postgres.repository';
import { CreateUserUseCase } from '../../application/useCase/createUser/CreateUser.useCase';
import { ControllerBase } from '@common';

@Controller('users')
export class UserController extends ControllerBase {
  private userRepository: UserRepositoryPort;
  constructor() {
    super();
    this.userRepository = new UserPostgresRepository();
  }
  @Post()
  async createUser(@Body() userDTO: UserDTO) {
    const useCase = new CreateUserUseCase(this.userRepository);
    this.runController(useCase, userDTO);
  }
}
