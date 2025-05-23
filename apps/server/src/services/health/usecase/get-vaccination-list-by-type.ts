import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VaccineTypes } from '@repo/shared/dist/cjs/types/enum.types';
import { VaccineModel } from 'src/database/models/vaccine.model';

@Injectable()
export class GetVaccinationListByTypeUseCase {
  constructor(
    @InjectModel('Vaccine') private readonly vaccineModel: VaccineModel,
  ) {}
  async execute(type: VaccineTypes) {
    return await this.vaccineModel.find({ type: type });
  }
}
