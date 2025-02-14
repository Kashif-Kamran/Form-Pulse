import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypedConfigService } from './configuration/configuration.module';
import { GlobalResponseInterceptor } from './common/global-response.interceptor';

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
  app.useGlobalInterceptors(new GlobalResponseInterceptor());

  await app.listen(port);
}
bootstrap();
