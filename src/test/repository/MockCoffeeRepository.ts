import { PaginatedQueryParams, Paginated } from '@common';
import { Coffee } from 'src/modules/Coffee/domain/Coffee.entity';
import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/Coffee.repository.port';

export class MockCoffeeRepository implements CoffeeRepositoryPort {
  private coffees: Coffee[] = [];

  async findByName(name: string): Promise<Coffee[]> {
    throw new Error('Method not implemented.');
  }
  async insert(entity: Coffee): Promise<void> {
    this.coffees.push(entity);
  }
  async insertSome(entity: Coffee[]): Promise<void> {
    this.coffees.push(...entity);
  }
  async findOneById(id: string): Promise<Coffee> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Coffee[]> {
    throw new Error('Method not implemented.');
  }
  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<Coffee>> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findPaginatedByCriteria(
    criteria: any,
    params: PaginatedQueryParams,
  ): Promise<Paginated<Coffee>> {
    const coffees = this.coffees.filter((coffee) => {
      let isValid = true;
      const coffeeProps = coffee.toPrimitives();
      for (const key in criteria) {
        if (coffeeProps[key] !== criteria[key]) {
          isValid = false;
        }
      }
      return isValid;
    });

    const paginatedCoffees = new Paginated<Coffee>({
      count: coffees.length,
      page: params.page,
      limit: params.limit,
      data: coffees,
    });

    return paginatedCoffees;
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
