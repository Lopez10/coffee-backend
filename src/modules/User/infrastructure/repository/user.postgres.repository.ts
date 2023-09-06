import { PaginatedQueryParams, Paginated, Email, ID } from '@common';
import { PrismaClient, User as UserModel } from '@prisma/client';
import { User } from '../../domain/User.entity';
import { UserRepositoryPort } from '../../domain/User.repository.port';
import { UserMapper } from '../../user.mapper';
import prisma from '@common/infrastructure/db';

export class UserPostgresRepository implements UserRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async insert(entity: User): Promise<void> {
    const user: UserModel = UserMapper.toDTO(entity);
    await this.prisma.user.create({ data: user });
  }

  async insertSome(entity: User[]): Promise<void> {
    const users: UserModel[] = entity.map((user) => UserMapper.toDTO(user));
    await this.prisma.user.createMany({ data: users });
  }

  async findOneById(id: ID): Promise<User | null> {
    const user: UserModel = await this.prisma.user.findUnique({
      where: { id: id.value },
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

  async findPaginatedByCriteria(
    criteria: any,
    params: PaginatedQueryParams,
  ): Promise<Paginated<User>> {
    const { limit, offset, orderBy } = params;
    const users: UserModel[] = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        [orderBy.field]: orderBy.param,
      },
      where: criteria,
    });
    const usersDomain = users.map((user) => UserMapper.toDomain(user));
    return new Paginated({
      count: users.length,
      limit,
      page: offset / limit,
      data: usersDomain,
    });
  }

  async delete(id: ID): Promise<boolean> {
    const userDeleted = await this.prisma.user.delete({
      where: { id: id.value },
    });

    if (!userDeleted) return false;

    return true;
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(handler);
  }

  async findOneByEmail(email: Email): Promise<User | null> {
    const user: UserModel = await this.prisma.user.findUnique({
      where: { email: email.value },
    });
    if (!user) return null;
    const userDomain = UserMapper.toDomain(user);
    return userDomain;
  }
}
