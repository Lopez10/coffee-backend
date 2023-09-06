import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/restAPI/User.controller';

@Module({
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
