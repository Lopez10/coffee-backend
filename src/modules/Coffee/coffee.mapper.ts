import { ID, Name, Roast } from '@common';
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
        roast: new Roast(coffee.roast),
        userId: new ID(coffee.userId),
      },
      new ID(coffee.id),
    );
  }

  static toDTO(entity: Coffee): CoffeeDTO {
    return entity.toPrimitives();
  }
}
