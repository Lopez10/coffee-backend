import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { router } from './api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/api', router);
  await app.listen(3000);
}
bootstrap();
