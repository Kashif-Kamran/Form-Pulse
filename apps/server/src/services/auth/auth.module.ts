import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  ConfigurationModule,
  TypedConfigService,
} from 'src/configuration/configuration.module';
import { LoginUserUseCase } from './usecases/login.usecase';
import { RegisterUserUseCase } from './usecases/register.usecase';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [TypedConfigService],
      useFactory: (configService: TypedConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [LoginUserUseCase, RegisterUserUseCase],
})
export class AuthModule {}
