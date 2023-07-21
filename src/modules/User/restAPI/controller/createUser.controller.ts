import { BaseController } from '@common/application/BaseController';
import {
  CreateUserDTO,
  CreateUserUseCase,
} from '../../application/createUser.useCase';
import { Request, Response } from 'express';
import { UserRepositoryPort } from '../../repository/user.repository.port';
import { PostgresUserRepository } from '../../infrastructure/postgresUser.repository';

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;
  private userRepository: UserRepositoryPort;
  constructor() {
    super();
    this.userRepository = new PostgresUserRepository();
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
