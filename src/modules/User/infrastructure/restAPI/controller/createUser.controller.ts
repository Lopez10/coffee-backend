import { BaseController } from '@common/application/BaseController';
import { Request, Response } from 'express';
import { UserRepositoryPort } from '../../../domain/user.repository.port';
import { UserPostgresRepository } from '../../repository/user.postgres.repository';
import {
  CreateUserDTO,
  CreateUserUseCase,
} from 'src/modules/User/application/CreateUser/createUser.useCase';

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;
  private userRepository: UserRepositoryPort;
  constructor() {
    super();
    this.userRepository = new UserPostgresRepository();
    this.useCase = new CreateUserUseCase(this.userRepository);
  }

  async runImplementation(
    req: Request,
    res: Response<any, Record<string, any>>,
  ): Promise<any> {
    let dto: CreateUserDTO = req.body as CreateUserDTO;

    dto = {
      email: dto.email,
      password: dto.password,
      name: dto.name,
      birthDate: dto.birthDate,
      description: dto.description,
    };
    try {
      const result = await this.useCase.run(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (error) {
      return this.fail(res, error);
    }
  }
}
