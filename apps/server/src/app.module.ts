import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './services/auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { AnimalModule } from './services/animal/animal.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, AuthModule, AnimalModule],
})
export class AppModule {}
