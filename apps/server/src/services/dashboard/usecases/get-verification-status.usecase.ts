import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VerificationStatusResponse } from '@repo/shared';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class GetVerificationStatusUseCase {
  private readonly logger = new Logger(GetVerificationStatusUseCase.name);

  constructor(
    @InjectModel('User')
    private readonly userModel: UserModel,
  ) {}

  async execute(): Promise<VerificationStatusResponse> {
    this.logger.log('Fetching user verification status');

    // Get total users count
    const totalUsers = await this.userModel.countDocuments();

    // Get verified users count (users where isVerified is true)
    const verifiedUsers = await this.userModel.countDocuments({
      isVerified: true,
    });

    const unverifiedUsers = totalUsers - verifiedUsers;
    const verificationRate =
      totalUsers > 0 ? Math.round((verifiedUsers / totalUsers) * 100) : 0;

    const data = [
      {
        status: 'verified' as const,
        count: verifiedUsers,
        percentage:
          totalUsers > 0 ? Math.round((verifiedUsers / totalUsers) * 100) : 0,
      },
      {
        status: 'unverified' as const,
        count: unverifiedUsers,
        percentage:
          totalUsers > 0 ? Math.round((unverifiedUsers / totalUsers) * 100) : 0,
      },
    ];

    return {
      success: true,
      data: {
        data,
        total: totalUsers,
        verificationRate,
      },
    };
  }
}
