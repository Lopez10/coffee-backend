import { Module } from '@nestjs/common';
import { UserModule } from './modules/User/User.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
