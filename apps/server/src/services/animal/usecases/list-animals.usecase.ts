import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalListResponse } from '@repo/shared';
import { AnimalModel } from 'src/database';
import { mapDocumentToResponse } from '../mappers/document-to-response.mapper';
import { AnimalDocument } from 'src/database/models/animal.model';

@Injectable()
export class ListAnimalsUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}
  async execute(searchQuery?: string): Promise<AnimalListResponse> {
    let resultDocs: AnimalDocument[] = [];
    const baseQuery = { isDeleted: { $ne: true } }; // Exclude soft-deleted records

    if (!searchQuery) {
      resultDocs = await this.animalModel.find(baseQuery).exec();
    } else {
      const regex = new RegExp(`^${searchQuery}`, 'i'); // case-insensitive prefix search
      resultDocs = await this.animalModel
        .find({
          ...baseQuery,
          $or: [{ name: { $regex: regex } }, { breed: { $regex: regex } }],
        })
        .exec();
    }
    const results = resultDocs.map((doc) => mapDocumentToResponse(doc));
    return { results, count: results.length };
  }
}
