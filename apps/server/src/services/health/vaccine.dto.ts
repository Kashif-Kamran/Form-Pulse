import {
  VaccineTypes,
  VaccineTypeValues,
} from '@repo/shared/dist/cjs/types/enum.types';
import { IsEnum, IsString } from 'class-validator';
import { CreateVaccineReq } from '@repo/shared';

export class CreateVaccineDto implements CreateVaccineReq {
  @IsString()
  name: string;

  @IsEnum(VaccineTypes)
  type: VaccineTypeValues;
}
