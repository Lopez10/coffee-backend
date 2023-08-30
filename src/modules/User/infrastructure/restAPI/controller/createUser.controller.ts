import { BaseController } from '@common/application/BaseController';
import { Request, Response } from 'express';
import { UserRepositoryPort } from '../../../domain/User.repository.port';
import { UserPostgresRepository } from '../../repository/User.postgres.repository';
import { CreateUserUseCase } from 'src/modules/User/application/useCase/createUser/CreateUser.useCase';
import { UserDTO } from 'src/modules/User/user.mapper';

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
    const dto: UserDTO = req.body;

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
