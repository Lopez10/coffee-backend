import { RepositoryPort } from '@common';
import { Coffee } from '@prisma/client';

export interface CoffeeRepositoryPort extends RepositoryPort<Coffee> {
  findOneByName(name: string): Promise<Coffee | null>;
}
