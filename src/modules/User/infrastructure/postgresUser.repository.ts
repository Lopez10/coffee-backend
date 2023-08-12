import { PaginatedQueryParams, Paginated } from '@common';
import { PrismaClient, User as UserModel } from '@prisma/client';
import { User } from '../domain/User.entity';
import { UserRepositoryPort } from '../repository/user.repository.port';
import { UserMapper } from '../user.mapper';

export class PostgresUserRepository implements UserRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async insert(entity: User | User[]): Promise<void> {
    // implementation goes here
  }

  async findOneById(id: string): Promise<User | null> {
    const user: UserModel = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    const userDomain = UserMapper.toDomain(user);
    return userDomain;
  }

  async findAll(): Promise<User[]> {
    const users: UserModel[] = await this.prisma.user.findMany();
    const usersDomain = users.map((user) => UserMapper.toDomain(user));
    return usersDomain;
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
    const user: UserModel = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    const userDomain = UserMapper.toDomain(user);
    return userDomain;
  }
}
