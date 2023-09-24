import {
  AppError,
  Either,
  Email,
  Result,
  Token,
  UseCaseBase,
  left,
  right,
} from '@common';
import { LoginUserErrors } from './LoginUser.error';
import { UserRepositoryPort } from '../../../domain/User.repository.port';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginDTOResponse {
  accessToken: Token;
}

type Response = Either<
  | AppError.UnexpectedError
  | LoginUserErrors.PasswordDoesntMatchError
  | LoginUserErrors.EmailDoesntExistError,
  Result<LoginDTOResponse>
>;

export class LoginUserUseCase
  implements UseCaseBase<LoginDTO, Promise<Response>>
{
  private userRepo: UserRepositoryPort;

  constructor(userRepo: UserRepositoryPort) {
    this.userRepo = userRepo;
  }
  async run(request: LoginDTO): Promise<Response> {
    try {
      const email = new Email(request.email);
      const plainTextPassword = request.password;

      const user = await this.userRepo.findOneByEmail(email);

      const userFound = !!user;

      if (!userFound) {
        return left(new LoginUserErrors.EmailDoesntExistError(email.value));
      }
      const passwordValid =
        user.props.password.comparePassword(plainTextPassword);

      if (!passwordValid) {
        return left(new LoginUserErrors.PasswordDoesntMatchError());
      }

      const accessToken: Token = Token.generate(
        process.env.JWT_SECRET_KEY,
        user.toPrimitives().id,
        user.toPrimitives().email,
      );

      return right(Result.ok<LoginDTOResponse>({ accessToken }));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
