import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteUserResponse, RoleType } from '@repo/shared';
import { User, UserModel } from 'src/database';

@Injectable()
export class DeleteUser {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async execute(userId: string, currentUserId: string): Promise<DeleteUserResponse> {
    try {
      // Prevent self-deletion
      if (userId === currentUserId) {
        throw new ForbiddenException('You cannot delete your own account');
      }

      // Check if user exists and is not already deleted
      const existingUser = await this.userModel.findOne({
        _id: userId,
        isDeleted: { $ne: true },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // If trying to delete an admin, check if there are other admins
      if (existingUser.role === RoleType.Admin) {
        const adminCount = await this.userModel.countDocuments({
          role: RoleType.Admin,
          isDeleted: { $ne: true },
        });

        if (adminCount <= 1) {
          throw new ForbiddenException(
            'Cannot delete the last admin user. There must be at least one admin in the system.'
          );
        }
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
      if (error instanceof NotFoundException || 
          error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete user');
    }
  }
}
