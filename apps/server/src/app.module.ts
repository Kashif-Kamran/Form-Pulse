import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './services/auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { AnimalModule } from './services/animal/animal.module';
import { AccountsModule } from './services/accounts/account.module';
import { FeedInventoryModule } from './services/feed-inventory/feed-inventory.module';
import { DietPlanModule } from './services/diet-plan/diet-plan.module';
import { HealthModule } from './services/health/health.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AuthModule,
    AnimalModule,
    AccountsModule,
    FeedInventoryModule,
    DietPlanModule,
    HealthModule,
  ],
})
export class AppModule {}
