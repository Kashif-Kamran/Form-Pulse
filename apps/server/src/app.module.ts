import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './services/user/user.module';
import { AuthModule } from './services/auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
