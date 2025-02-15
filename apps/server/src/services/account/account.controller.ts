import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetProfileUseCase } from './usecases/get-profile.usecase';

@Controller('accounts')
export class AccountController {
  constructor(private readonly getProfileUseCase: GetProfileUseCase) {}
  @Get('me')
  async getProfile(@Req() req: Request) {
    return await this.getProfileUseCase.execute(req.user._id.toString());
  }
}
