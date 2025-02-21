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
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { EmailModule } from '../email/email.module';
import { VerifyOtpUseCase } from './usecases/verify-otp.usecase';

@Module({
  imports: [
    DatabaseModule,
    EmailModule,
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
  providers: [
    LoginUserUseCase,
    RegisterUserUseCase,
    VerifyOtpUseCase,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
