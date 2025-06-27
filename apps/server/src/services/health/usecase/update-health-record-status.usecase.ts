import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '@repo/shared';
import {
  VaccineStatuses,
  VaccineStatusValues,
} from '@repo/shared/dist/cjs/types/enum.types';
import { UserModel } from 'src/database';
import { AnimalHealthRecordModel } from 'src/database/models/animal-health-record.model';
import { Types } from 'mongoose';
import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(VaccineStatuses, {
    message: `newStatus must be one of: ${Object.values(VaccineStatuses).join(', ')}`,
  })
  newStatus: VaccineStatusValues;
}

@Injectable()
export class UpdateHealthRecordStatusUseCase {
  constructor(
    @InjectModel('User') private readonly userModel: UserModel,
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
  ) {}

  async execute(
    recordId: string,
    scheduleId: string,
    updateStatusDto: UpdateStatusDto,
    loggedInUser: IUser,
  ) {
    // Find the health record and verify veterinarian access
    const healthRecord = await this.animalHealthRecordModel.findById(recordId);

    if (!healthRecord) {
      throw new NotFoundException('Health record not found');
    }

    // Verify that the logged-in user is the veterinarian for this record
    if (healthRecord.veterinarian.toString() !== loggedInUser._id.toString()) {
      throw new ForbiddenException(
        'You are not authorized to update this health record',
      );
    }

    // Find the specific schedule in the schedule array
    const scheduleIndex = healthRecord.schedule.findIndex((s) =>
      s._id.equals(scheduleId),
    );

    if (scheduleIndex === -1) {
      throw new NotFoundException('Schedule not found in this health record');
    }

    const currentSchedule = healthRecord.schedule[scheduleIndex];

    // If trying to revert from COMPLETED to PENDING, check the 10-minute rule
    if (
      updateStatusDto.newStatus === VaccineStatuses.PENDING &&
      currentSchedule.status === VaccineStatuses.COMPLETED &&
      currentSchedule.administeredDate
    ) {
      const now = new Date();
      const administeredTime = new Date(currentSchedule.administeredDate);
      const timeDifferenceInMinutes =
        (now.getTime() - administeredTime.getTime()) / (1000 * 60);

      if (timeDifferenceInMinutes > 10) {
        throw new BadRequestException(
          'Cannot revert vaccination status to pending. More than 10 minutes have passed since completion.',
        );
      }
    }

    // Update the status of the found schedule
    healthRecord.schedule[scheduleIndex].status = updateStatusDto.newStatus;

    // If status is being set to COMPLETED, set the administered date
    if (updateStatusDto.newStatus === VaccineStatuses.COMPLETED) {
      healthRecord.schedule[scheduleIndex].administeredDate = new Date();
    }

    // If status is being reverted from COMPLETED to PENDING, clear the administered date
    if (updateStatusDto.newStatus === VaccineStatuses.PENDING) {
      healthRecord.schedule[scheduleIndex].administeredDate = null;
    }

    // Save the updated health record
    await healthRecord.save();

    return {
      message: 'Vaccination status updated successfully',
      updatedSchedule: healthRecord.schedule[scheduleIndex],
    };
  }
}
