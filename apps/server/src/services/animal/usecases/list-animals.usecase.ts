import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalListResponse } from '@repo/shared';
import { AnimalModel } from 'src/database';
import { mapDocumentToResponse } from '../mappers/document-to-response.mapper';

@Injectable()
export class ListAnimalsUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}
  async execute(): Promise<AnimalListResponse> {
    const resultDocs = await this.animalModel.find();
    const results = resultDocs.map((doc) => mapDocumentToResponse(doc));
    return { results, count: results.length };
  }
}
