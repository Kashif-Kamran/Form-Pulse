import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from './use-cases/register.use-case';
import { UserModule } from '../user/user.module';
import { LoginUserUseCase } from './use-cases/login.use-case';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  ConfigurationModule,
  TypedConfigService,
} from 'src/configuration/configuration.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
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
  providers: [RegisterUserUseCase, LoginUserUseCase],
})
export class AuthModule {}
