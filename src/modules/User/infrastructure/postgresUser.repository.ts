import { PaginatedQueryParams, Paginated } from '@common';
import { Option } from 'oxide.ts';
import { User } from '../domain/User.entity';
import { UserRepositoryPort } from '../repository/user.repository.port';

export class PostgresUserRepository implements UserRepositoryPort {
  async insert(entity: User | User[]): Promise<void> {
    // implementation goes here
  }

  async findOneById(id: string): Promise<Option<User>> {
    // implementation goes here
    return;
  }

  async findAll(): Promise<User[]> {
    // implementation goes here
    return;
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<User>> {
    // implementation goes here
    return;
  }

  async delete(entity: User): Promise<boolean> {
    // implementation goes here
    return;
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    // implementation goes here
    return;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    // implementation goes here
    return null;
  }
}
