import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AllowedRolesList, UsersListResponse, PublicUser } from '@repo/shared';
import { IsIn, IsOptional, IsString, IsNumberString } from 'class-validator';
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

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}

@Injectable()
export class GetUsersList {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async execute(queryDto: GetUsersListQueryDto): Promise<UsersListResponse> {
    const filter: FilterQuery<User> = {
      isDeleted: { $ne: true }, // Only get non-deleted users
    };

    // Filter construction
    if (queryDto.q) {
      const regex = new RegExp(queryDto.q, 'i');
      filter.$or = [
        { name: { $regex: regex } },
        { email: { $regex: regex } },
        { role: { $regex: regex } },
      ];
    }

    if (queryDto.role) {
      filter.role = queryDto.role;
    }

    // Pagination
    const page = parseInt(queryDto.page || '1', 10);
    const limit = parseInt(queryDto.limit || '10', 10);
    const skip = (page - 1) * limit;

    console.log('Filter: ', filter);

    // Get users with pagination
    const [usersList, totalCount] = await Promise.all([
      this.userModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(filter),
    ]);

    // Map to public user format
    const results: PublicUser[] = usersList.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    return {
      results,
      count: totalCount,
    };
  }
}
