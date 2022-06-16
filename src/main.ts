import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);

  process.on('SIGINT', () => {
    console.log('server stop by SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('server stop by SIGTERM');
    process.exit(0);
  });
}
bootstrap();
