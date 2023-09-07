import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserDTO } from '../../user.mapper';
import { UserRepositoryPort } from '../../domain/User.repository.port';
import { UserPostgresRepository } from '../repository/User.postgres.repository';
import { CreateUserUseCase } from '../../application/useCase/createUser/CreateUser.useCase';
import { ControllerBase } from '@common';
import {
  DeleteUserDTO,
  DeleteUserUseCase,
} from '../../application/useCase/deleteUser/DeleteUser.useCase';
import {
  RetrieveUserDTO,
  RetrieveUserUseCase,
} from '../../application/useCase/retrieveUser/RetrieveUser.useCase';
import {
  LoginUserUseCase,
  LoginDTO,
} from '../../application/useCase/loginUser/LoginUser.useCase';

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

  @Delete()
  async deleteUser(@Body() deleteUserDTO: DeleteUserDTO) {
    const useCase = new DeleteUserUseCase(this.userRepository);
    this.runController(useCase, deleteUserDTO);
  }

  @Get('/user')
  async retrieveUser(@Body() retrieveUserDTO: RetrieveUserDTO) {
    const useCase = new RetrieveUserUseCase(this.userRepository);
    this.runController(useCase, retrieveUserDTO);
  }

  @Get('/login')
  async login(@Body() loginDTO: LoginDTO) {
    const useCase = new LoginUserUseCase(this.userRepository);
    this.runController(useCase, loginDTO);
  }
}
