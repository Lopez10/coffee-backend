import {
  AppError,
  Either,
  Email,
  Password,
  Result,
  UseCase,
  left,
  right,
} from '@common';
import { JWTToken, RefreshToken } from '@common/auth/jwt';
import { LoginUserErrors } from './LoginUser.error';
import { UserRepositoryPort } from 'src/modules/User/domain/User.repository.port';
import { AuthServicePort } from 'src/modules/User/services/Auth.service.port';
import { User } from 'src/modules/User/domain/User.entity';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginDTOResponse {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
}

type Response = Either<
  | AppError.UnexpectedError
  | LoginUserErrors.PasswordDoesntMatchError
  | LoginUserErrors.EmailDoesntExistError,
  Result<LoginDTOResponse>
>;

export class LoginUserUseCase implements UseCase<LoginDTO, Promise<Response>> {
  private userRepo: UserRepositoryPort;
  private authService: AuthServicePort;

  constructor(userRepo: UserRepositoryPort, authService: AuthServicePort) {
    this.userRepo = userRepo;
    this.authService = authService;
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

      const passwordValid = await user.props.password.equals(password);

      if (!passwordValid) {
        return left(new LoginUserErrors.PasswordDoesntMatchError());
      }

      const accessToken: JWTToken = this.authService.signJWT({
        email: user.toPrimitives().email,

        // TODO: Add isAdmin and isEmailVerified to the user entity and modify this fields
        isAdmin: false,
        isEmailVerified: true,

        name: user.toPrimitives().name,
        userId: user.toPrimitives().id,
      });

      const refreshToken: RefreshToken = this.authService.createRefreshToken();

      user.setAccessToken(accessToken, refreshToken);

      await this.authService.saveAuthenticatedUser(user);

      return right(
        Result.ok<LoginDTOResponse>({
          accessToken,
          refreshToken,
        }),
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
