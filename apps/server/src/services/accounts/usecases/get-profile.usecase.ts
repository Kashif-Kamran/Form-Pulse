import { InjectModel } from '@nestjs/mongoose';
import { UserProfileResponse } from '@repo/shared';
import { UserDocument, UserModel } from 'src/database';
import { NotFoundException } from '@nestjs/common';

export class GetProfileUseCase {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}
  async execute(userId: string): Promise<UserProfileResponse> {
    const userDocument: UserDocument = await this.userModel.findOne({
      _id: userId,
      isDeleted: { $ne: true }, // Exclude deleted users
    });
    
    if (!userDocument) {
      throw new NotFoundException('User not found or has been deleted');
    }
    
    return {
      email: userDocument.email,
      id: userDocument.id,
      isVerified: userDocument.isVerified,
      name: userDocument.name,
      role: userDocument.role,
      isDeleted: userDocument.isDeleted,
      deletedAt: userDocument.deletedAt,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt,
    };
  }
}
