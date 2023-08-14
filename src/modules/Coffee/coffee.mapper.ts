import { ID, Name, roast } from '@common';
import { Coffee } from './domain/Coffee.entity';

export interface CoffeeDTO {
  id: string;
  name: string;
  origin: string;
  height: number;
  roast: string;
  userId: string;
}

export class CoffeeMapper {
  static toDomain(coffee: CoffeeDTO): Coffee {
    return Coffee.create(
      {
        name: new Name(coffee.name),
        origin: coffee.origin,
        height: coffee.height,
        roast: coffee.roast as roast,
        userId: new ID(coffee.id),
      },
      new ID(coffee.id),
    );
  }

  static toDTO(entity: Coffee): CoffeeDTO {
    return entity.toPrimitives();
  }
}
