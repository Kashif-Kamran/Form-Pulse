import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AllowedRolesList, UserListResponse } from '@repo/shared';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { FilterQuery } from 'mongoose';
import { User, UserModel } from 'src/database';

export class GetUsersListQueryDto {
  @IsOptional()
  @IsIn(AllowedRolesList, {
    message: `role must be one of: ${AllowedRolesList.join(', ')}`,
  })
  role?: string;

  @IsOptional()
  @IsString()
  q?: string;
}

@Injectable()
export class GetUsersList {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async execute(queryDto: GetUsersListQueryDto): Promise<UserListResponse> {
    const filter: FilterQuery<User> = {};
    // Filter construction
    if (queryDto.q) {
      const regex = new RegExp(`^${queryDto.q}`, 'i');
      filter.$or = [{ name: { $regex: regex } }, { email: { $regex: regex } }];
    }
    if (queryDto.role) filter.role = queryDto.role;

    console.log('Filter : ', filter);

    const usersList = await this.userModel.find(filter);
    return {
      count: usersList.length,
      results: usersList.map((item) => ({
        email: item.email,
        name: item.name,
        id: item.id,
        isVerified: item.isVerified,
        role: item.role,
      })),
    };
  }
}
