import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VaccineModel } from 'src/database/models/vaccine.model';
import { PopulateVaccineDto } from '../vaccine.dto';

@Injectable()
export class PopulateVaccines {
  constructor(
    @InjectModel('Vaccine') private readonly vaccineModel: VaccineModel,
  ) {}

  async execute(dto: PopulateVaccineDto) {
    return this.vaccineModel.insertMany(dto.vaccines);
  }
}
