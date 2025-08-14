import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  ConfigurationModule,
  TypedConfigService,
} from 'src/configuration/configuration.module';
import { LoginUserUseCase } from './usecases/login.usecase';
// import { RegisterUserUseCase } from './usecases/register.usecase'; // Removed - admin-only user creation
import { DatabaseModule } from 'src/database/database.module';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
// import { EmailModule } from '../emailemail.module'; // Removed email dependency for auth
// import { VerifyOtpUseCase } from './usecases/verify-otp.usecase'; // Removed - no email verification

@Module({
  imports: [
    DatabaseModule,
    // EmailModule, // Removed - no email verification for auth now
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
    // RegisterUserUseCase, // Removed - admin-only user creation
    // VerifyOtpUseCase, // Removed - no email verification
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
