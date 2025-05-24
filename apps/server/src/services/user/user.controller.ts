import { Controller, Get, Query } from '@nestjs/common';
import {
  GetUsersList,
  GetUsersListQueryDto,
} from './usecases/get-users-list.usecase';
import { Public } from '../auth/decorators/public.decorator';
import { FilterQuery } from 'mongoose';
import { User } from 'src/database';

@Controller('users')
export class UserController {
  constructor(private readonly getUsersList: GetUsersList) {}

  @Get('/list')
  @Public()
  getPublicUser(@Query() queryDto: GetUsersListQueryDto) {
    return this.getUsersList.execute(queryDto);
  }
}
