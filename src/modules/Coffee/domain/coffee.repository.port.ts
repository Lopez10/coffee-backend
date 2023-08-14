import { RepositoryPort } from '@common';
import { Coffee } from './Coffee.entity';

export interface CoffeeRepositoryPort extends RepositoryPort<Coffee> {
  findByName(name: string): Promise<Coffee[]>;
}
