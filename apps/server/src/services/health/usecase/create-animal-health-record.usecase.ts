import {
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  CreateAnimalHealthRecordReq,
  CreateAnimalHealthRecordResponse,
} from '@repo/shared';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { AnimalHealthRecordModel } from 'src/database/models/animal-health-record.model';
import { IsMongooseObjectId } from 'src/common/interceptors/pipes/is-mongoose-object-id.validator';
import { VaccineModel } from 'src/database/models/vaccine.model';
import { AnimalModel, UserModel } from 'src/database';

class ScheduleDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateTime: Date;

  @IsNumber()
  @Min(0.1)
  @IsNotEmpty()
  quantity: number;
}

export class CreateAnimalHealthRecordDto
  implements CreateAnimalHealthRecordReq
{
  @IsString()
  @IsNotEmpty()
  @IsMongooseObjectId()
  vaccine: string;

  @IsString()
  @IsNotEmpty()
  @IsMongooseObjectId()
  animal: string;

  @IsString()
  @IsNotEmpty()
  @IsMongooseObjectId()
  veterinarian: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedule: ScheduleDto[];
}

@Injectable()
export class CreateAnimalHealthRecordUseCase {
  constructor(
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
    @InjectModel('Vaccine') private readonly vaccineModel: VaccineModel,
    @InjectModel('User') private readonly userModel: UserModel,
  ) {}
  async execute(
    dto: CreateAnimalHealthRecordDto,
  ): Promise<CreateAnimalHealthRecordResponse> {
    const vaccine = await this.vaccineModel.findOne({ _id: dto.vaccine });
    if (!vaccine) throw new NotFoundException('Vaccine Not Found');
    const animal = await this.animalModel.findOne({ _id: dto.animal });
    if (!animal) throw new NotFoundException('Animal Not Found');
    const user = await this.userModel.findOne({ _id: dto.veterinarian });
    if (!user) throw new NotFoundException('Veterinarian Not Found');
    // Response
    const response = await this.animalHealthRecordModel.create({ ...dto });
    return response;
  }
}
