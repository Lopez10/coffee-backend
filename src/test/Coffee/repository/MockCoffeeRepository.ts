import { PaginatedQueryParams, Paginated, Name, ID } from '@common';
import { Coffee } from 'src/modules/Coffee/domain/Coffee.entity';
import { CoffeeRepositoryPort } from 'src/modules/Coffee/domain/Coffee.repository.port';

export class MockCoffeeRepository implements CoffeeRepositoryPort {
  private coffees: Coffee[] = [];

  async findByName(name: Name): Promise<Coffee[]> {
    const coffees = this.coffees.filter((coffee) =>
      coffee.getPropsCopy().name.equals(name),
    );
    return coffees;
  }
  async insert(entity: Coffee): Promise<void> {
    this.coffees.push(entity);
  }
  async insertSome(entity: Coffee[]): Promise<void> {
    this.coffees.push(...entity);
  }
  async findOneById(id: ID): Promise<Coffee> {
    const coffee = this.coffees.find((coffee) =>
      coffee.getPropsCopy().id.equals(id),
    );
    return coffee;
  }
  async findAll(): Promise<Coffee[]> {
    return this.coffees;
  }
  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<Coffee>> {
    const paginatedCoffees = new Paginated<Coffee>({
      count: this.coffees.length,
      page: params.page,
      limit: params.limit,
      data: this.coffees,
    });

    return paginatedCoffees;
  }
  async delete(id: ID): Promise<boolean> {
    const coffee = this.coffees.find((coffee) =>
      coffee.getPropsCopy().id.equals(id),
    );
    if (!coffee) {
      return false;
    }
    this.coffees = this.coffees.filter(
      (coffee) => !coffee.getPropsCopy().id.equals(id),
    );
    return true;
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
    return handler();
  }
}
