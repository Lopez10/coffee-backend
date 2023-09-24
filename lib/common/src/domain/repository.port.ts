import { ID } from './valueObject';

export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy = { field: string; param: 'asc' | 'desc' };

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
};

export interface RepositoryPort<Entity> {
  insert(entity: Entity): Promise<void>;
  insertSome(entity: Entity[]): Promise<void>;
  findOneById(id: ID): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
  delete(id: ID): Promise<boolean>;
  findPaginatedByCriteria(
    criteria: any,
    params: PaginatedQueryParams,
  ): Promise<Paginated<Entity>>;
  update(entity: Entity): Promise<Entity>;
  transaction<T>(handler: () => Promise<T>): Promise<T>;
}
