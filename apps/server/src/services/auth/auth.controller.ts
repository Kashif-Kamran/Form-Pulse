import { Controller, Post, Get, Body, HttpCode, Request } from '@nestjs/common';
import { LoginUserDto, RegisterUserRequestDto } from './auth.dtos';
import { LoginUserUseCase } from './usecases/login.usecase';
import { RegisterUserUseCase } from './usecases/register.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
    private registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerUserDto: RegisterUserRequestDto) {
    return this.registerUserUseCase.execute(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }
}
