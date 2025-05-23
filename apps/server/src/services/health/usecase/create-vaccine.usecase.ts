import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVaccineDto } from '../vaccine.dto';
import { VaccineModel } from 'src/database/models/vaccine.model';

@Injectable()
export class CreateVaccineUseCase {
  constructor(
    @InjectModel('Vaccine') private readonly vaccineModel: VaccineModel,
  ) {}

  async execute(createVaccineDto: CreateVaccineDto) {
    const existingVaccine = await this.vaccineModel.findOne({
      name: createVaccineDto.name,
    });

    if (existingVaccine) {
      throw new ConflictException(
        `Vaccine with name '${createVaccineDto.name}' already exists`,
      );
    }

    return await this.vaccineModel.create({
      ...createVaccineDto,
    });
  }
}
