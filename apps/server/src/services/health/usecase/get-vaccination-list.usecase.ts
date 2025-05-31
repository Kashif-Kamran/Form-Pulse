import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VaccineListResponse } from '@repo/shared';
import {
  VaccineTypeValues,
  VaccineTypes,
} from '@repo/shared/dist/cjs/types/enum.types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FilterQuery } from 'mongoose';
import { Vaccine, VaccineModel } from 'src/database/models/vaccine.model';

export class GetVaccinationListQueryDto {
  @IsOptional()
  @IsEnum(VaccineTypes)
  type?: VaccineTypes;

  @IsOptional()
  @IsString()
  q?: string;
}

@Injectable()
export class GetVaccinationListUseCase {
  constructor(
    @InjectModel('Vaccine') private readonly vaccineModel: VaccineModel,
  ) {}
  async execute(
    queryDto: GetVaccinationListQueryDto,
  ): Promise<VaccineListResponse> {
    const filter: FilterQuery<Vaccine> = {};
    if (queryDto.type) filter.type = queryDto.type;
    if (queryDto.q) {
      const regex = new RegExp(`^${queryDto.q}`, 'i');
      filter.$or = [{ name: { $regex: regex } }];
    }

    const vaccines = await this.vaccineModel.find(filter).exec();
    return {
      count: vaccines.length,
      results: vaccines,
    };
  }
}
