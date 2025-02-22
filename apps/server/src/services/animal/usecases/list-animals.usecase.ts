import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalModel } from 'src/database';

@Injectable()
export class ListAnimalsUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}
  async execute() {
    const results = await this.animalModel
      .find()
      .select('-createdAt -updatedAt -__v ')
      .lean()
      .exec();
    return { results, count: results.length };
  }
}
