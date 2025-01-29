import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginUserDto, RegisterUserRequestDto } from './auth.dtos';
import { RegisterUserUseCase } from './use-cases/register.use-case';
import { LoginUserUseCase } from './use-cases/login.use-case';
import { AuthGuard } from './gaurds/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUC: RegisterUserUseCase,
    private readonly loginUserUC: LoginUserUseCase,
  ) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerUserDto: RegisterUserRequestDto) {
    return this.registerUserUC.execute(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUC.execute(loginUserDto);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() request) {
    const user = await request.user;
    return user.getPublicFeils();
  }
}
