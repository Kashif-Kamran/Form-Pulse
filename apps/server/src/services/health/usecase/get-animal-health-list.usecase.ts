import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AnimalHealthRecordResponse,
  AnimalHealthRecordsListResponse,
  ListResponse,
} from '@repo/shared';
import { AnimalHealthRecordModel } from 'src/database/models/animal-health-record.model';

@Injectable()
export class GetAnimalListUseCase {
  constructor(
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
  ) {}
  async execute(): Promise<AnimalHealthRecordsListResponse> {
    const results = (await this.animalHealthRecordModel
      .find()
      .populate([
        { path: 'animal' },
        { path: 'vaccine' },
        { path: 'veterinarian' },
      ])) as any as AnimalHealthRecordsListResponse['results'];
    return {
      count: results.length,
      results,
    };
  }
}
