import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from './use-cases/register.use-case';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserUseCase } from './use-cases/login.use-case';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'this is going to be initialized',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [RegisterUserUseCase, LoginUserUseCase],
})
export class AuthModule {}
