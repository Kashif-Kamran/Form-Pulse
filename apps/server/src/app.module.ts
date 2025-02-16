import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './services/auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { AccountModule } from './services/account/account.module';
import { AnimalModule } from './services/animal/animal.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AuthModule,
    AccountModule,
    AnimalModule,
  ],
})
export class AppModule {}
