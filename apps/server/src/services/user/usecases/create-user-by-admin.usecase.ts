import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserByAdminReq,
  CreateUserResponse,
  PublicUser,
} from '@repo/shared';
import { User, UserModel } from 'src/database';
import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { RoleType } from '@repo/shared';

export class CreateUserByAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(RoleType)
  role: RoleType;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}

@Injectable()
export class CreateUserByAdmin {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async execute(
    createUserDto: CreateUserByAdminDto,
  ): Promise<CreateUserResponse> {
    try {
      // Check if user with email already exists
      const existingUser = await this.userModel.findOne({
        email: createUserDto.email,
        isDeleted: { $ne: true },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );

      // Create user
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
        isVerified: createUserDto.isVerified || true, // Admin-created users are verified by default
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const savedUser = await newUser.save();

      // Return public user data
      const publicUser: PublicUser = {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        isVerified: savedUser.isVerified,
        isDeleted: savedUser.isDeleted,
        deletedAt: savedUser.deletedAt,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      };

      return publicUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Failed to create user');
    }
  }
}
