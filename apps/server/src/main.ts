import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { asapScheduler } from 'rxjs';
import { TypedConfigService } from './configuration/configuration.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const typedConfigService = app.get(TypedConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const port = typedConfigService.get('PORT');
  app.useGlobalInterceptors();
  await app.listen(port);
}
bootstrap();
