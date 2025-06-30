import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AnimalHealthRecord } from 'src/database/models/animal-health-record.model';
import { CreateAnimalHealthRecordDto } from './create-animal-health-record.usecase';

export interface UpdateAnimalHealthRecordResponse {
  message: string;
  data: {
    id: string;
  };
}

@Injectable()
export class UpdateHealthRecordUseCase {
  private readonly logger = new Logger(UpdateHealthRecordUseCase.name);

  constructor(
    @InjectModel(AnimalHealthRecord.name)
    private animalHealthRecordModel: Model<AnimalHealthRecord>,
  ) {}

  async execute(
    recordId: string,
    updateDto: CreateAnimalHealthRecordDto,
  ): Promise<UpdateAnimalHealthRecordResponse> {
    this.logger.log(`Updating health record ${recordId} with data:`, updateDto);

    const existingRecord =
      await this.animalHealthRecordModel.findById(recordId);

    if (!existingRecord) {
      throw new NotFoundException(
        `Health record with ID ${recordId} not found`,
      );
    }

    this.logger.log(`Existing record found:`, {
      id: existingRecord._id,
      currentAnimal: existingRecord.animal,
      newAnimal: updateDto.animal,
    });

    // Update the health record
    const updatedRecord = await this.animalHealthRecordModel.findByIdAndUpdate(
      recordId,
      {
        animal: new Types.ObjectId(updateDto.animal),
        veterinarian: new Types.ObjectId(updateDto.veterinarian),
        vaccine: new Types.ObjectId(updateDto.vaccine),
        schedule: updateDto.schedule,
      },
      { new: true },
    );

    this.logger.log(`Record updated successfully:`, {
      id: updatedRecord!._id,
      newAnimal: updatedRecord!.animal,
    });

    return {
      message: 'Health record updated successfully',
      data: {
        id: updatedRecord!._id.toString(),
      },
    };
  }
}
