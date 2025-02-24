import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetProfileUseCase } from './usecases/get-profile.usecase';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly getProfileUC: GetProfileUseCase) {}
  @Get('me')
  getProfile(@Req() request: Request) {
    return this.getProfileUC.execute(request.user.id);
  }
}
