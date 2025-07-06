import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MigrationService } from './database/migration.service';
import { Logger } from '@nestjs/common';

async function runMigrations() {
  const logger = new Logger('DevMigrations');
  
  try {
    logger.log('🚀 Running development migrations...');
    
    const app = await NestFactory.createApplicationContext(AppModule);
    const migrationService = app.get(MigrationService);
    
    await migrationService.runMigrations();
    
    await app.close();
    logger.log('✅ Development migrations completed!');
  } catch (error) {
    logger.error('❌ Development migrations failed:', error);
    throw error;
  }
}

// Auto-run migrations in development
if (process.env.NODE_ENV === 'development') {
  runMigrations().catch(console.error);
}

export { runMigrations };
