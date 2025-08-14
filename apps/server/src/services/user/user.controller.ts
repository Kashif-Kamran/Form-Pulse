import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  GetUsersList,
  GetUsersListQueryDto,
} from './usecases/get-users-list.usecase';
import {
  CreateUserByAdmin,
  CreateUserByAdminDto,
} from './usecases/create-user-by-admin.usecase';
import { UpdateUser, UpdateUserDto } from './usecases/update-user.usecase';
import { DeleteUser } from './usecases/delete-user.usecase';
import { Public } from '../auth/decorators/public.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesAllowed } from '../auth/decorators/roles-allowed.decorator';
import { RoleType } from '@repo/shared';
import {
  CreateUserWithCredentialsResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  UsersListResponse,
} from '@repo/shared';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUsersList: GetUsersList,
    private readonly createUserByAdmin: CreateUserByAdmin,
    private readonly updateUserUsecase: UpdateUser,
    private readonly deleteUserUsecase: DeleteUser,
  ) {}

  @Get('/list')
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.Admin)
  async getUsers(
    @Query() queryDto: GetUsersListQueryDto,
  ): Promise<UsersListResponse> {
    return this.getUsersList.execute(queryDto);
  }

  @Post('/create')
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.Admin)
  async createUser(
    @Body() createUserDto: CreateUserByAdminDto,
  ): Promise<CreateUserWithCredentialsResponse> {
    return this.createUserByAdmin.execute(createUserDto);
  }

  @Put('/:userId')
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.Admin)
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.updateUserUsecase.execute(userId, updateUserDto);
  }

  @Delete('/:userId')
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.Admin)
  async deleteUser(
    @Param('userId') userId: string,
    @Request() request: any,
  ): Promise<DeleteUserResponse> {
    return this.deleteUserUsecase.execute(userId, request.user.id);
  }

  // Keep the existing public endpoint for backwards compatibility
  @Get('/public')
  @Public()
  async getPublicUsers(
    @Query() queryDto: GetUsersListQueryDto,
  ): Promise<UsersListResponse> {
    return this.getUsersList.execute(queryDto);
  }
}
