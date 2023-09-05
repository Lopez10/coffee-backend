import { PaginatedQueryParams, Paginated, Name, ID } from '@common';
import { CoffeeRepositoryPort } from '../../domain/Coffee.repository.port';
import { PrismaClient, Coffee as CoffeeModel } from '@prisma/client';
import { Coffee } from '../../domain/Coffee.entity';
import { CoffeeMapper } from '../../Coffee.mapper';

export class CoffeePostgresRepository implements CoffeeRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByName(name: Name): Promise<Coffee[]> {
    const coffees = await this.prisma.coffee.findMany({
      where: { name: name.value },
    });
    const coffeesDomain = coffees.map((coffee) =>
      CoffeeMapper.toDomain(coffee),
    );

    return coffeesDomain;
  }

  async insert(entity: Coffee): Promise<void> {
    const coffee: CoffeeModel = CoffeeMapper.toDTO(entity);
    await this.prisma.coffee.create({ data: coffee });
  }

  async insertSome(entity: Coffee[]): Promise<void> {
    const coffees: CoffeeModel[] = entity.map((coffee) =>
      CoffeeMapper.toDTO(coffee),
    );
    await this.prisma.coffee.createMany({ data: coffees });
  }

  async findOneById(id: ID): Promise<Coffee> {
    const coffee: CoffeeModel = await this.prisma.coffee.findUnique({
      where: { id: id.value },
    });
    const coffeeDomain = CoffeeMapper.toDomain(coffee);
    return coffeeDomain;
  }

  async findAll(): Promise<Coffee[]> {
    const coffees: CoffeeModel[] = await this.prisma.coffee.findMany();
    const coffeesDomain = coffees.map((coffee) =>
      CoffeeMapper.toDomain(coffee),
    );
    return coffeesDomain;
  }

  async delete(id: ID): Promise<boolean> {
    const coffeeDeleted = await this.prisma.coffee.delete({
      where: { id: id.value },
    });

    if (!coffeeDeleted) return false;
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(handler);
  }

  async findPaginatedByCriteria(
    criteria: any,
    params: PaginatedQueryParams,
  ): Promise<Paginated<Coffee>> {
    const { limit, offset, orderBy } = params;
    const coffees: CoffeeModel[] = await this.prisma.coffee.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        [orderBy.field]: orderBy.param,
      },
      where: criteria,
    });
    const coffeesDomain = coffees.map((coffee) =>
      CoffeeMapper.toDomain(coffee),
    );
    return new Paginated({
      count: coffees.length,
      limit,
      page: offset / limit,
      data: coffeesDomain,
    });
  }
}
