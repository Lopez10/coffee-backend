import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoffeeRepositoryPort } from '../../domain/Coffee.repository.port';
import { CoffeePostgresRepository } from '../repository/Coffee.postgres.repository';
import { CoffeeDTO } from '../../Coffee.mapper';
import { CreateCoffeeUseCase } from '../../application/useCase/createCoffee/CreateCoffee.useCase';
import { ControllerBase } from '@common';
import { RetrieveCoffeesUseCase } from '../../application/useCase/retrieveCoffees/RetrieveCoffees.useCase';

@Controller('coffees')
export class CoffeeController extends ControllerBase {
  private coffeeRepository: CoffeeRepositoryPort;
  constructor() {
    super();
    this.coffeeRepository = new CoffeePostgresRepository();
  }

  @Post()
  async createCoffee(@Body() coffeeDTO: CoffeeDTO) {
    const useCase = new CreateCoffeeUseCase(this.coffeeRepository);
    this.runController(useCase, coffeeDTO);
  }

  @Get()
  async retrieveCoffees() {
    const useCase = new RetrieveCoffeesUseCase(this.coffeeRepository);
    this.runController(useCase);
  }
}
