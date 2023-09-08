import { Email, ID, PaginatedQueryParams, Paginated } from '@common';
import { User } from '../../../modules/User/domain/User.entity';
import { UserRepositoryPort } from '../../../modules/User/domain/User.repository.port';
import { UserDTO, UserMapper } from '../../../modules/User/user.mapper';

export class MockUserRepository implements UserRepositoryPort {
  private users: UserDTO[] = [];

  async findOneByEmail(email: Email): Promise<User> {
    const userData = this.users.find((user) => user.email === email.value);
    if (!userData) {
      return null;
    }
    const user = UserMapper.toDomain(userData);

    return user;
  }
  async insert(entity: User): Promise<void> {
    const user = await this.findOneByEmail(entity.getPropsCopy().email);
    if (user) {
      throw new Error('User already exists');
    }
    const userData = UserMapper.toDTO(entity);
    this.users.push(userData);
  }
  async insertSome(entities: User[]): Promise<void> {
    const usersData = entities.map((user) => UserMapper.toDTO(user));
    this.users.push(...usersData);
  }
  async findOneById(id: ID): Promise<User> {
    const userData = this.users.find((user) => user.id === id.value);
    if (!userData) {
      return null;
    }
    const user = UserMapper.toDomain(userData);

    return user;
  }
  async findAll(): Promise<User[]> {
    const users = this.users.map((user) => UserMapper.toDomain(user));

    return users;
  }
  async delete(id: ID): Promise<boolean> {
    const userData = this.users.find((user) => user.id === id.value);

    if (!userData) {
      return false;
    }

    this.users = this.users.filter((user) => user.id !== id.value);

    return true;
  }
  async findPaginatedByCriteria(
    criteria: any,
    params: PaginatedQueryParams,
  ): Promise<Paginated<User>> {
    const usersData = this.users.filter((user) => {
      let isValid = true;
      for (const key in criteria) {
        if (user[key] !== criteria[key]) {
          isValid = false;
        }
      }
      return isValid;
    });

    const users = usersData.map((user) => UserMapper.toDomain(user));
    const paginatedUsers = new Paginated<User>({
      count: users.length,
      page: params.page,
      limit: params.limit,
      data: users,
    });

    return paginatedUsers;
  }
  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return handler();
  }
}
