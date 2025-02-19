import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypedConfigService } from 'src/configuration/configuration.module';
// Schemas
import { UserSchema } from './models/user.model';
import { AnimalSchema } from './models/animal.model';
import { MedicalHistorySchema } from './models/medical-history.model';
import { DietPlanSchema } from './models/diet-plan.model';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async (configService: TypedConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Animal', schema: AnimalSchema },
      { name: 'MedicalHistory', schema: MedicalHistorySchema },
      { name: 'DietPlan', schema: DietPlanSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
