import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
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

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  const port = typedConfigService.get('PORT');
  await app.listen(port);
}
bootstrap();
