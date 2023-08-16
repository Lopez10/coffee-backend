import { PaginatedQueryParams, Paginated } from '@common';
import { PrismaClient, User as UserModel } from '@prisma/client';
import { User } from '../../domain/User.entity';
import { UserRepositoryPort } from '../../domain/user.repository.port';
import { UserMapper } from '../../user.mapper';

export class UserPostgresRepository implements UserRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async insert(entity: User): Promise<void> {
    const user: UserModel = UserMapper.toDTO(entity);
    await this.prisma.user.create({ data: user });
  }

  async insertSome(entity: User[]): Promise<void> {
    const users: UserModel[] = entity.map((user) => UserMapper.toDTO(user));
    await this.prisma.user.createMany({ data: users });
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
    const { limit, offset, orderBy } = params;
    const users: UserModel[] = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        [orderBy.field]: orderBy.param,
      },
    });
    const usersDomain = users.map((user) => UserMapper.toDomain(user));
    return new Paginated({
      count: users.length,
      limit,
      page: offset / limit,
      data: usersDomain,
    });
  }

  async findByCriteria(criteria: any): Promise<User[]> {
    const users: UserModel[] = await this.prisma.user.findMany({
      where: criteria,
    });
    const usersDomain = users.map((user) => UserMapper.toDomain(user));
    return usersDomain;
  }

  async delete(entity: User): Promise<boolean> {
    const user: UserModel = UserMapper.toDTO(entity);
    const userDeleted = await this.prisma.user.delete({
      where: { id: user.id },
    });

    if (!userDeleted) return false;

    return true;
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(handler);
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
