import { Email, RepositoryPort } from '@common';
import { User } from './User.entity';

export interface UserRepositoryPort extends RepositoryPort<User> {
  findOneByEmail(email: Email): Promise<User | null>;
}
