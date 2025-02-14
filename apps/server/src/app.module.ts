import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './services/user/user.module';
import { AuthModule } from './services/auth/auth.module';
import { UserController } from './services/user/user.controller';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, UserModule, AuthModule],
  controllers: [UserController],
})
export class AppModule {}
