import { PaginatedQueryParams, Paginated, Name, ID } from '@common';
import { CoffeeDTO, CoffeeMapper } from '../../../modules/Coffee/Coffee.mapper';
import { Coffee } from '../../../modules/Coffee/domain/Coffee.entity';
import { CoffeeRepositoryPort } from '../../../modules/Coffee/domain/Coffee.repository.port';

export class MockCoffeeRepository implements CoffeeRepositoryPort {
  private coffees: CoffeeDTO[] = [];

  async findByName(name: Name): Promise<Coffee[]> {
    const coffeesData = this.coffees.filter(
      (coffee) => coffee.name === name.value,
    );

    const coffees = coffeesData.map((coffee) => CoffeeMapper.toDomain(coffee));

    return coffees;
  }
  async insert(entity: Coffee): Promise<void> {
    const coffeeData = CoffeeMapper.toDTO(entity);
    this.coffees.push(coffeeData);
  }
  async insertSome(entities: Coffee[]): Promise<void> {
    const coffeesData = entities.map((entity) => CoffeeMapper.toDTO(entity));
    this.coffees.push(...coffeesData);
  }
  async findOneById(id: ID): Promise<Coffee> {
    const coffeeData = this.coffees.find((coffee) => coffee.id === id.value);
    const coffee = CoffeeMapper.toDomain(coffeeData);

    return coffee;
  }
  async findAll(): Promise<Coffee[]> {
    const coffees = this.coffees.map((coffee) => CoffeeMapper.toDomain(coffee));
    return coffees;
  }
  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<Coffee>> {
    const coffees = this.coffees.map((coffee) => CoffeeMapper.toDomain(coffee));
    const paginatedCoffees = new Paginated<Coffee>({
      count: coffees.length,
      page: params.page,
      limit: params.limit,
      data: coffees,
    });

    return paginatedCoffees;
  }
  async delete(id: ID): Promise<boolean> {
    const coffeeData = this.coffees.find((coffee) => coffee.id === id.value);

    if (!coffeeData) {
      return false;
    }

    this.coffees = this.coffees.filter((coffee) => coffee.id !== id.value);

    return true;
  }

  async findPaginatedByCriteria(
    criteria: any,
    params: PaginatedQueryParams,
  ): Promise<Paginated<Coffee>> {
    const coffeesData = this.coffees.filter((coffee) => {
      let isValid = true;
      for (const key in criteria) {
        if (coffee[key] !== criteria[key]) {
          isValid = false;
        }
      }
      return isValid;
    });

    const coffees = coffeesData.map((coffee) => CoffeeMapper.toDomain(coffee));
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
