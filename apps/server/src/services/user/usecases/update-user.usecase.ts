import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserReq, UpdateUserResponse, PublicUser } from '@repo/shared';
import { User, UserModel } from 'src/database';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { RoleType } from '@repo/shared';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(RoleType)
  role?: RoleType;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}

@Injectable()
export class UpdateUser {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async execute(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    try {
      // Check if user exists and is not deleted
      const existingUser = await this.userModel.findOne({
        _id: userId,
        isDeleted: { $ne: true },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // If email is being updated, check if it's already taken
      if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
        const emailExists = await this.userModel.findOne({
          email: updateUserDto.email,
          _id: { $ne: userId },
          isDeleted: { $ne: true },
        });

        if (emailExists) {
          throw new ConflictException('Email is already taken by another user');
        }
      }

      // Update user
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: userId, isDeleted: { $ne: true } },
        {
          ...updateUserDto,
          updatedAt: new Date(),
        },
        { new: true },
      );

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      // Return public user data
      const publicUser: PublicUser = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
        isDeleted: updatedUser.isDeleted,
        deletedAt: updatedUser.deletedAt,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };

      return publicUser;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update user');
    }
  }
}
