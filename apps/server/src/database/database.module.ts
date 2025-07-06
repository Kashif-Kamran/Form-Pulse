import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TypedConfigService,
  ConfigurationModule,
} from 'src/configuration/configuration.module';
// Schemas
import { UserSchema } from './models/user.model';
import { AnimalSchema } from './models/animal.model';
import { FeedInventorySchema } from './models/feed-inventory.model';
import { DietPlan, DietPlanSchema } from './models/diet-plan.model';
import { VaccineSchema } from './models/vaccine.model';
import { AnimalHealthRecordSchema } from './models/animal-health-record.model';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: TypedConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [TypedConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Animal', schema: AnimalSchema },
      { name: 'FeedInventory', schema: FeedInventorySchema },
      { name: 'DietPlan', schema: DietPlanSchema },
      { name: 'Vaccine', schema: VaccineSchema },
      { name: 'AnimalHealthRecord', schema: AnimalHealthRecordSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
