import { RepositoryPort } from '@common';
import { User } from '../domain/User.entity';

export interface UserRepositoryPort extends RepositoryPort<User> {
  findOneByEmail(email: string): Promise<User | null>;
}
