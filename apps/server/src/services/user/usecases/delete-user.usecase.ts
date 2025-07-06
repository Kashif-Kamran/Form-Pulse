import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteUserResponse } from '@repo/shared';
import { User, UserModel } from 'src/database';

@Injectable()
export class DeleteUser {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async execute(userId: string): Promise<DeleteUserResponse> {
    try {
      // Check if user exists and is not already deleted
      const existingUser = await this.userModel.findOne({
        _id: userId,
        isDeleted: { $ne: true },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // Soft delete user
      const deletedAt = new Date();
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: userId, isDeleted: { $ne: true } },
        {
          isDeleted: true,
          deletedAt: deletedAt,
          updatedAt: new Date(),
        },
        { new: true },
      );

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'User deleted successfully',
        deletedAt: deletedAt.toISOString(),
        userId: userId,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete user');
    }
  }
}
