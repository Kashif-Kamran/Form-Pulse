import { Controller, Post, Get, Body, HttpCode, Request } from '@nestjs/common';
import {
  LoginUserDto,
  RegisterUserRequestDto,
  VerifyOtpReq,
} from './auth.dtos';
import { LoginUserUseCase } from './usecases/login.usecase';
import { RegisterUserUseCase } from './usecases/register.usecase';
import { Public } from './decorators/public.decorator';
import { VerifyOtpUseCase } from './usecases/verify-otp.usecase';
import { registerSchema } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
    private registerUserUseCase: RegisterUserUseCase,
    private verifyOtpUseCase: VerifyOtpUseCase,
  ) {}

  @Post('register')
  @HttpCode(201)
  @Public()
  async register(@Body() registerUserDto: RegisterUserRequestDto) {
    return this.registerUserUseCase.execute(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  @Post('verify-otp')
  @HttpCode(200)
  @Public()
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpReq) {
    return this.verifyOtpUseCase.execute(verifyOtpDto);
  }
}
