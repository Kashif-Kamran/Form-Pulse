import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRolesResponse } from '@repo/shared';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class GetUserRolesUseCase {
  private readonly logger = new Logger(GetUserRolesUseCase.name);

  constructor(
    @InjectModel('User')
    private readonly userModel: UserModel,
  ) {}

  async execute(): Promise<UserRolesResponse> {
    this.logger.log('Fetching user roles distribution');

    // Get total users count
    const totalUsers = await this.userModel.countDocuments();

    // Get user counts by role
    const roleAggregation = await this.userModel.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const data = roleAggregation.map((role) => ({
      role: role._id as
        | 'Admin'
        | 'Nutritionist'
        | 'Veterinarian'
        | 'Care Taker',
      count: role.count,
      percentage:
        totalUsers > 0 ? Math.round((role.count / totalUsers) * 100) : 0,
    }));

    // Ensure all roles are represented, even if count is 0
    const allRoles: (
      | 'Admin'
      | 'Nutritionist'
      | 'Veterinarian'
      | 'Care Taker'
    )[] = ['Admin', 'Nutritionist', 'Veterinarian', 'Care Taker'];

    const completeData = allRoles.map((role) => {
      const existing = data.find((d) => d.role === role);
      return (
        existing || {
          role,
          count: 0,
          percentage: 0,
        }
      );
    });

    return {
      success: true,
      data: {
        data: completeData,
        total: totalUsers,
      },
    };
  }
}
