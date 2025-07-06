import { NestFactory } from '@nestjs/core';
import { MigrationModule } from './database/migration.module';
import { MigrationService } from './database/migration.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('MigrationCLI');

  try {
    logger.log('🚀 Initializing migration system...');

    const app = await NestFactory.createApplicationContext(MigrationModule);
    const migrationService = app.get(MigrationService);

    // Run migrations
    await migrationService.runMigrations();

    await app.close();
    logger.log('✅ Migration system completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Migration system failed:', error);
    process.exit(1);
  }
}

bootstrap();
