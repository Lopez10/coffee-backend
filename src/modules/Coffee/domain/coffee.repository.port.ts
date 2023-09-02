import { Name, RepositoryPort } from '@common';
import { Coffee } from './Coffee.entity';

export interface CoffeeRepositoryPort extends RepositoryPort<Coffee> {
  findByName(name: Name): Promise<Coffee[]>;
}
