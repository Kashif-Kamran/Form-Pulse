import {
  VaccineTypes,
  VaccineTypeValues,
} from '@repo/shared/dist/cjs/types/enum.types';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { CreateVaccineReq } from '@repo/shared';
import { Type } from 'class-transformer';

export class CreateVaccineDto implements CreateVaccineReq {
  @IsString()
  name: string;

  @IsEnum(VaccineTypes)
  type: VaccineTypeValues;
}

export class PopulateVaccineDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVaccineDto)
  vaccines: CreateVaccineDto[];
}
