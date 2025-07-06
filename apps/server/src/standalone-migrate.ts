import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import * as bcrypt from 'bcrypt';
import configFunction from './configuration/env.config';
import { RoleType } from '@repo/shared';

// Standalone Migration Module
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFunction],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
class StandaloneMigrationModule {}

class StandaloneMigrationService {
  private readonly logger = new Logger(StandaloneMigrationService.name);

  constructor(private readonly connection: Connection) {}

  /**
   * Create admin user seed
   */
  async createAdminUser() {
    try {
      const userCollection = this.connection.collection('users');

      // Check if admin user already exists
      const existingAdmin = await userCollection.findOne({
        email: 'admin@formpulse.com',
      });

      if (existingAdmin) {
        this.logger.warn('Admin user already exists, skipping creation');
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      // Create admin user
      const adminUser = {
        name: 'System Administrator',
        email: 'admin@formpulse.com',
        password: hashedPassword,
        role: RoleType.Admin,
        isVerified: true,
        verificationOtp: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await userCollection.insertOne(adminUser);
      this.logger.log('✅ Admin user created successfully');
      this.logger.log('📧 Email: admin@formpulse.com');
      this.logger.log('🔐 Password: Admin@123');
    } catch (error) {
      this.logger.error('❌ Failed to create admin user:', error);
      throw error;
    }
  }

  /**
   * Add soft delete fields to existing collections
   */
  async addSoftDeleteFields() {
    try {
      const collections = ['animals', 'dietplans', 'animalhealthrecords'];

      for (const collectionName of collections) {
        const collection = this.connection.collection(collectionName);

        // Add soft delete fields to documents that don't have them
        const result = await collection.updateMany(
          {
            $or: [
              { isDeleted: { $exists: false } },
              { deletedAt: { $exists: false } },
            ],
          },
          {
            $set: {
              isDeleted: false,
              deletedAt: null,
            },
          },
        );

        this.logger.log(
          `✅ Updated ${result.modifiedCount} documents in ${collectionName} collection`,
        );
      }
    } catch (error) {
      this.logger.error('❌ Failed to add soft delete fields:', error);
      throw error;
    }
  }

  /**
   * Seed vaccines
   */
  async seedVaccines() {
    try {
      const vaccineCollection = this.connection.collection('vaccines');

      const existingVaccinesCount = await vaccineCollection.countDocuments();

      if (existingVaccinesCount > 0) {
        this.logger.warn('Vaccines already exist, skipping vaccine seeding');
        return;
      }

      const vaccines = [
        // Live Vaccines
        {
          name: 'Mukteswar (NDV)',
          type: 'Live',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Komarov (NDV)',
          type: 'Live',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'LaSota (NDV)',
          type: 'Live',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gumbo Vac. (IBD)',
          type: 'Live',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gumbo Vac. Forte (Hot)',
          type: 'Live',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ND + IB + Fowl Pox + IB',
          type: 'Live',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Killed Vaccines
        {
          name: 'ND + Hydro Vaccine',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hydro Clear (Angara)',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'AI Plain (Aqua Base)',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'AI Oil Emulsion',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ND + AI Oil Emulsion',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ND Oil Emulsion',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IBD Oil Emulsion',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ND + IBD Oil Emulsion',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ND + IB Oil Emulsion',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ND + IB + IBD Oil Emulsion',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ND + IB + H9 Oil Emulsion',
          type: 'Killed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Livestock Vaccines
        {
          name: 'HS Vaccine (Aqua Base & Oil Base)',
          type: 'Livestock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ET Vaccine',
          type: 'Livestock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mastitis Vaccine',
          type: 'Livestock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'CCPP Vaccine',
          type: 'Livestock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lumpy Vaccine',
          type: 'Livestock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'PPR Vaccine',
          type: 'Livestock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Bactrin
        {
          name: 'E. coli Vaccine (Aqua Base)',
          type: 'Bactrin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Biologics
        {
          name: 'Sterile Diluent',
          type: 'Biologics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Normal Saline',
          type: 'Biologics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Distilled Water',
          type: 'Biologics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Floor Cleaner',
          type: 'Biologics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Surface Cleaner',
          type: 'Biologics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Glass Cleaner',
          type: 'Biologics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hand Wash Liquid',
          type: 'Biologics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hand Sanitizer',
          type: 'Biologics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await vaccineCollection.insertMany(vaccines);
      this.logger.log(`✅ ${vaccines.length} vaccines seeded successfully`);
    } catch (error) {
      this.logger.error('❌ Failed to seed vaccines:', error);
      throw error;
    }
  }

  /**
   * Create indexes for better performance
   */
  async createIndexes() {
    try {
      // User indexes
      await this.connection
        .collection('users')
        .createIndex({ email: 1 }, { unique: true });
      await this.connection.collection('users').createIndex({ role: 1 });

      // Animal indexes
      await this.connection.collection('animals').createIndex({ isDeleted: 1 });
      await this.connection
        .collection('animals')
        .createIndex({ name: 'text', species: 'text', breed: 'text' });

      // Diet plan indexes
      await this.connection.collection('dietplans').createIndex({ animal: 1 });
      await this.connection
        .collection('dietplans')
        .createIndex({ isDeleted: 1 });

      // Health record indexes
      await this.connection
        .collection('animalhealthrecords')
        .createIndex({ animal: 1 });
      await this.connection
        .collection('animalhealthrecords')
        .createIndex({ isDeleted: 1 });

      // Vaccine indexes
      await this.connection.collection('vaccines').createIndex({ type: 1 });
      await this.connection.collection('vaccines').createIndex({ name: 1 });

      this.logger.log('✅ Database indexes created successfully');
    } catch (error) {
      this.logger.error('❌ Failed to create indexes:', error);
      throw error;
    }
  }

  /**
   * Run all migrations
   */
  async runMigrations() {
    this.logger.log('🚀 Starting database migrations...');

    try {
      await this.createAdminUser();
      await this.addSoftDeleteFields();
      await this.seedVaccines();
      await this.createIndexes();

      this.logger.log('🎉 All migrations completed successfully!');
    } catch (error) {
      this.logger.error('❌ Migration failed:', error);
      throw error;
    }
  }
}

async function bootstrap() {
  const logger = new Logger('StandaloneMigrationCLI');

  try {
    logger.log('🚀 Initializing standalone migration system...');

    const app = await NestFactory.createApplicationContext(
      StandaloneMigrationModule,
    );

    // Get the mongoose connection
    const connection = app.get('DatabaseConnection');

    // Create migration service instance
    const migrationService = new StandaloneMigrationService(connection);

    // Run migrations
    await migrationService.runMigrations();

    await app.close();
    logger.log('✅ Standalone migration system completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Standalone migration system failed:', error);
    process.exit(1);
  }
}

bootstrap();
