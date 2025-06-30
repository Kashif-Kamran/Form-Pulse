import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../../../database/models/animal.model';

export interface AgeDistributionItem {
  ageGroup: string;
  count: number;
  percentage: number;
  minAge: number;
  maxAge: number;
}

export interface AgeDistributionResponse {
  success: boolean;
  data: {
    data: AgeDistributionItem[];
    total: number;
  };
}

@Injectable()
export class GetAgeDistributionUseCase {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}

  async execute(): Promise<AgeDistributionResponse> {
    try {
      // Get total count of animals
      const totalAnimals = await this.animalModel.countDocuments();

      // Aggregate age distribution with defined age groups
      const ageDistribution = await this.animalModel.aggregate([
        {
          $addFields: {
            ageGroup: {
              $switch: {
                branches: [
                  { case: { $lt: ['$age', 1] }, then: 'Young (< 1 year)' },
                  {
                    case: {
                      $and: [{ $gte: ['$age', 1] }, { $lt: ['$age', 3] }],
                    },
                    then: 'Juvenile (1-3 years)',
                  },
                  {
                    case: {
                      $and: [{ $gte: ['$age', 3] }, { $lt: ['$age', 7] }],
                    },
                    then: 'Adult (3-7 years)',
                  },
                  { case: { $gte: ['$age', 7] }, then: 'Senior (7+ years)' },
                ],
                default: 'Unknown',
              },
            },
          },
        },
        {
          $group: {
            _id: '$ageGroup',
            count: { $sum: 1 },
            minAge: { $min: '$age' },
            maxAge: { $max: '$age' },
          },
        },
        {
          $project: {
            ageGroup: '$_id',
            count: 1,
            minAge: 1,
            maxAge: 1,
            percentage: {
              $round: [
                { $multiply: [{ $divide: ['$count', totalAnimals] }, 100] },
                1,
              ],
            },
            _id: 0,
          },
        },
        {
          $sort: { minAge: 1 },
        },
      ]);

      return {
        success: true,
        data: {
          data: ageDistribution,
          total: totalAnimals,
        },
      };
    } catch (error) {
      throw new Error(`Failed to get age distribution: ${error.message}`);
    }
  }
}
