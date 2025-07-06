import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RoleType } from '@repo/shared';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  /**
   * Create admin user seed
   */
  async createAdminUser() {
    try {
      const userCollection = this.connection.collection('users');
      
      // Check if admin user already exists
      const existingAdmin = await userCollection.findOne({ 
        email: 'admin@formpulse.com' 
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
              { deletedAt: { $exists: false } }
            ]
          },
          { 
            $set: {
              isDeleted: false,
              deletedAt: null
            }
          }
        );

        this.logger.log(`✅ Updated ${result.modifiedCount} documents in ${collectionName} collection`);
      }
    } catch (error) {
      this.logger.error('❌ Failed to add soft delete fields:', error);
      throw error;
    }
  }

  /**
   * Create indexes for better performance
   */
  async createIndexes() {
    try {
      // User indexes
      await this.connection.collection('users').createIndex({ email: 1 }, { unique: true });
      await this.connection.collection('users').createIndex({ role: 1 });
      
      // Animal indexes
      await this.connection.collection('animals').createIndex({ isDeleted: 1 });
      await this.connection.collection('animals').createIndex({ name: 'text', species: 'text', breed: 'text' });
      
      // Diet plan indexes
      await this.connection.collection('dietplans').createIndex({ animal: 1 });
      await this.connection.collection('dietplans').createIndex({ isDeleted: 1 });
      
      // Health record indexes
      await this.connection.collection('animalhealthrecords').createIndex({ animal: 1 });
      await this.connection.collection('animalhealthrecords').createIndex({ isDeleted: 1 });
      
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
      await this.createIndexes();
      
      this.logger.log('🎉 All migrations completed successfully!');
    } catch (error) {
      this.logger.error('❌ Migration failed:', error);
      throw error;
    }
  }
}
