import { Module } from '@nestjs/common';
import { UserModule } from './modules/User/User.module';
import { CoffeeModule } from './modules/Coffee/Coffee.module';

@Module({
  imports: [UserModule, CoffeeModule],
})
export class AppModule {}
