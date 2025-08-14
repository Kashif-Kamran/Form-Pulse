import { Controller, Post, Get, Body, HttpCode, Request } from '@nestjs/common';
import {
  LoginUserDto,
  // RegisterUserRequestDto, // Removed - admin-only user creation now
  // OtpVerificationDto, // Removed - no email verification needed
} from './auth.dtos';
import { LoginUserUseCase } from './usecases/login.usecase';
// import { RegisterUserUseCase } from './usecases/register.usecase'; // Removed
import { Public } from './decorators/public.decorator';
// import { VerifyOtpUseCase } from './usecases/verify-otp.usecase'; // Removed

@Controller('auth')
export class AuthController {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
    // Registration and OTP use cases removed - admin-only user creation
    // private registerUserUseCase: RegisterUserUseCase,
    // private verifyOtpUseCase: VerifyOtpUseCase,
  ) {}

  // Public registration endpoint removed - admin creates users through user management
  // @Post('register')
  // @HttpCode(201)
  // @Public()
  // async register(@Body() registerUserDto: RegisterUserRequestDto) {
  //   return this.registerUserUseCase.execute(registerUserDto);
  // }

  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  // OTP verification endpoint removed - no email verification needed
  // @Post('verify-otp')
  // @HttpCode(200)
  // @Public()
  // async verifyOtp(@Body() verifyOtpDto: OtpVerificationDto) {
  //   return this.verifyOtpUseCase.execute(verifyOtpDto);
  // }

  @Get('me')
  @HttpCode(200)
  async getCurrentUser(@Request() request: any) {
    const user = request.user;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  }
}
