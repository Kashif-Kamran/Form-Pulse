import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { DatabaseModule } from './database.module';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule],
  providers: [MigrationService],
  exports: [MigrationService],
})
export class MigrationModule {}
