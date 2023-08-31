import { JWTClaims, JWTToken, RefreshToken } from '@common/auth/jwt';
import { User } from '../domain/User.entity';

export interface AuthServicePort {
  signJWT(props: JWTClaims): JWTToken;
  decodeJWT(token: string): Promise<JWTClaims>;
  createRefreshToken(): RefreshToken;
  getTokens(email: string): Promise<string[]>;
  saveAuthenticatedUser(user: User): Promise<void>;
  refreshTokenExists(refreshToken: RefreshToken): Promise<boolean>;
  deAuthenticateUser(email: string): Promise<void>;
}
