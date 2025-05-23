import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VaccineModel } from 'src/database/models/vaccine.model';

@Injectable()
export class GetVaccinationListUseCase {
  constructor(
    @InjectModel('Vaccine') private readonly vaccineModel: VaccineModel,
  ) {}
  async execute() {
    return this.vaccineModel.find();
  }
}
