import { InjectModel } from '@nestjs/mongoose';
import { UserProfileResponse } from '@repo/shared';
import { UserDocument, UserModel } from 'src/database';

export class GetProfileUseCase {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}
  async execute(userId: string): Promise<UserProfileResponse> {
    const userDocument: UserDocument = await this.userModel.findOne({
      _id: userId,
    });
    return {
      email: userDocument.email,
      id: userDocument.id,
      isVerified: userDocument.isVerified,
      name: userDocument.name,
      role: userDocument.role,
    };
  }
}
