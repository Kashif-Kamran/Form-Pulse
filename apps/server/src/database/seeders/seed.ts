import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from '../database.module';
import { SeederService } from './seeder.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('SeederCLI');
  
  try {
    logger.log('🌱 Initializing seeder system...');
    
    const app = await NestFactory.createApplicationContext(DatabaseModule);
    
    // Register seeder service
    const seederService = new SeederService(app.get('DatabaseConnection'));
    
    // Run seeders
    await seederService.runSeeders();
    
    await app.close();
    logger.log('✅ Seeder system completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Seeder system failed:', error);
    process.exit(1);
  }
}

bootstrap();
