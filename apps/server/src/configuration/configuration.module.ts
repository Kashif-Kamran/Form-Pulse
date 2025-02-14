import { Module } from '@nestjs/common';
import envConfigurations, { ConfigSchema } from './env.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class TypedConfigService extends ConfigService<ConfigSchema> {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [envConfigurations],
    }),
  ],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class ConfigurationModule {}
