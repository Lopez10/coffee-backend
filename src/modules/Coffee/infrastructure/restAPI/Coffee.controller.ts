import { Body, Controller, Post } from '@nestjs/common';
import { CoffeeRepositoryPort } from '../../domain/Coffee.repository.port';
import { CoffeePostgresRepository } from '../repository/Coffee.postgres.repository';
import { CoffeeDTO } from '../../Coffee.mapper';
import { CreateCoffeeUseCase } from '../../application/useCase/createCoffee/CreateCoffee.useCase';

@Controller('coffees')
export class CoffeeController {
  private coffeeRepository: CoffeeRepositoryPort;
  constructor() {
    this.coffeeRepository = new CoffeePostgresRepository();
  }

  @Post()
  async createCoffee(@Body() coffeeDTO: CoffeeDTO) {
    const useCase = new CreateCoffeeUseCase(this.coffeeRepository);
    try {
      const result = await useCase.run(coffeeDTO);
      if (result.isLeft()) {
        return result.value.getErrorValue().message;
      }
      return result.value.getValue();
    } catch (error) {
      return error.message;
    }
  }
}
