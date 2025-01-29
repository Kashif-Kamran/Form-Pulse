import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from 'src/configuration/db.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig],
    }),
  ],
})
export class ConfigurationModule {}
