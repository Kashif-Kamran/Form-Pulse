import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnimalHealthRecord } from 'src/database/models/animal-health-record.model';
import { PopulatedAnimalHealthRecord } from '@repo/shared';

@Injectable()
export class GetHealthRecordByIdUseCase {
  constructor(
    @InjectModel(AnimalHealthRecord.name)
    private animalHealthRecordModel: Model<AnimalHealthRecord>,
  ) {}

  async execute(
    recordId: string,
  ): Promise<{ data: PopulatedAnimalHealthRecord }> {
    const healthRecord = await this.animalHealthRecordModel
      .findById(recordId)
      .populate('animal')
      .populate('veterinarian')
      .populate('vaccine')
      .exec();

    if (!healthRecord) {
      throw new NotFoundException(
        `Health record with ID ${recordId} not found`,
      );
    }

    // Transform the mongoose document to the expected format
    const populatedRecord = {
      ...healthRecord.toObject(),
      id: healthRecord._id.toString(),
    } as unknown as PopulatedAnimalHealthRecord;

    return {
      data: populatedRecord,
    };
  }
}
