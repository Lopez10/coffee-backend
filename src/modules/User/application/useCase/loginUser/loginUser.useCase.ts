import {
  AppError,
  Either,
  Email,
  Password,
  Result,
  Token,
  UseCase,
  left,
  right,
} from '@common';
import { LoginUserErrors } from './LoginUser.error';
import { UserRepositoryPort } from 'src/modules/User/domain/User.repository.port';
import { User } from 'src/modules/User/domain/User.entity';

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

export class LoginUserUseCase implements UseCase<LoginDTO, Promise<Response>> {
  private userRepo: UserRepositoryPort;

  constructor(userRepo: UserRepositoryPort) {
    this.userRepo = userRepo;
  }
  async run(request: LoginDTO): Promise<Response> {
    let email: Email;
    let password: Password;
    let user: User;

    try {
      email = new Email(request.email);
      password = new Password(request.password);

      user = await this.userRepo.findOneByEmail(email);

      const userFound = !!user;

      if (!userFound) {
        return left(new LoginUserErrors.EmailDoesntExistError(email.value));
      }

      const passwordValid = user.props.password.equals(password);

      if (!passwordValid) {
        return left(new LoginUserErrors.PasswordDoesntMatchError());
      }

      const accessToken: Token = Token.generate(
        process.env.JWT_SECRET_KEY,
        user,
      );

      return right(Result.ok<LoginDTOResponse>({ accessToken }));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
