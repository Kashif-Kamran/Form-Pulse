import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../../../database/models/animal.model';

export interface SpeciesDistributionItem {
  species: string;
  count: number;
  percentage: number;
}

export interface SpeciesDistributionResponse {
  success: boolean;
  data: {
    data: SpeciesDistributionItem[];
    total: number;
  };
}

@Injectable()
export class GetSpeciesDistributionUseCase {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}

  async execute(): Promise<SpeciesDistributionResponse> {
    try {
      // Get total count of animals
      const totalAnimals = await this.animalModel.countDocuments();

      // Aggregate species distribution
      const speciesDistribution = await this.animalModel.aggregate([
        {
          $group: {
            _id: '$species',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            species: '$_id',
            count: 1,
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
          $sort: { count: -1 },
        },
      ]);

      return {
        success: true,
        data: {
          data: speciesDistribution,
          total: totalAnimals,
        },
      };
    } catch (error) {
      throw new Error(`Failed to get species distribution: ${error.message}`);
    }
  }
}
