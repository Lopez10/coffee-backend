import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CoffeeRepositoryPort } from '../../domain/Coffee.repository.port';
import { CoffeePostgresRepository } from '../repository/Coffee.postgres.repository';
import { CoffeeDTO } from '../../Coffee.mapper';
import { CreateCoffeeUseCase } from '../../application/useCase/createCoffee/CreateCoffee.useCase';
import { ControllerBase } from '@common';
import { RetrieveCoffeesUseCase } from '../../application/useCase/retrieveCoffees/RetrieveCoffees.useCase';
import {
  UpdateCoffeeDTO,
  UpdateCoffeeUseCase,
} from '../../application/useCase/updateCoffee/UpdateCoffee.useCase';

@Controller('coffees')
export class CoffeeController extends ControllerBase {
  private coffeeRepository: CoffeeRepositoryPort;
  constructor() {
    super();
    this.coffeeRepository = new CoffeePostgresRepository();
  }

  @Post()
  async createCoffee(@Body() coffee: CoffeeDTO) {
    const useCase = new CreateCoffeeUseCase(this.coffeeRepository);
    this.runController(useCase, coffee);
  }

  @Get()
  async retrieveCoffees() {
    const useCase = new RetrieveCoffeesUseCase(this.coffeeRepository);
    this.runController(useCase);
  }

  @Put()
  async updateCoffee(@Body() coffee: UpdateCoffeeDTO) {
    const useCase = new UpdateCoffeeUseCase(this.coffeeRepository);
    this.runController(useCase, coffee);
  }
}
