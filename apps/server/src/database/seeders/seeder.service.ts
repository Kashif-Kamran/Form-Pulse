import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RoleType } from '@repo/shared';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  /**
   * Seed users
   */
  async seedUsers() {
    try {
      const userCollection = this.connection.collection('users');
      
      // Check if users already exist
      const existingUsersCount = await userCollection.countDocuments();
      
      if (existingUsersCount > 0) {
        this.logger.warn('Users already exist, skipping user seeding');
        return;
      }

      const users = [
        {
          name: 'System Administrator',
          email: 'admin@formpulse.com',
          password: await bcrypt.hash('Admin@123', 10),
          role: RoleType.Admin,
          isVerified: true,
          verificationOtp: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Dr. Sarah Johnson',
          email: 'vet@formpulse.com',
          password: await bcrypt.hash('Vet@123', 10),
          role: RoleType.Veterinarian,
          isVerified: true,
          verificationOtp: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'John Smith',
          email: 'nutritionist@formpulse.com',
          password: await bcrypt.hash('Nutri@123', 10),
          role: RoleType.Nutritionist,
          isVerified: true,
          verificationOtp: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mike Wilson',
          email: 'caretaker@formpulse.com',
          password: await bcrypt.hash('Care@123', 10),
          role: RoleType.CareTaker,
          isVerified: true,
          verificationOtp: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await userCollection.insertMany(users);
      this.logger.log('✅ Users seeded successfully');
    } catch (error) {
      this.logger.error('❌ Failed to seed users:', error);
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
   * Seed feed inventory
   */
  async seedFeedInventory() {
    try {
      const feedCollection = this.connection.collection('feedinventories');
      
      const existingFeedCount = await feedCollection.countDocuments();
      
      if (existingFeedCount > 0) {
        this.logger.warn('Feed inventory already exists, skipping feed seeding');
        return;
      }

      const feedItems = [
        {
          name: 'Premium Dog Food',
          remainingStock: 100,
          usedStock: 0,
          totalPrice: 2500,
          description: 'High-quality premium dog food for adult dogs',
          nutritionInfo: {
            protein: 26,
            carbs: 45,
            fats: 16,
            fiber: 4,
            calories: 3500,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cat Food - Salmon',
          remainingStock: 75,
          usedStock: 0,
          totalPrice: 1800,
          description: 'Salmon-based cat food with essential nutrients',
          nutritionInfo: {
            protein: 30,
            carbs: 35,
            fats: 18,
            fiber: 3,
            calories: 3800,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Horse Feed - Oats',
          remainingStock: 200,
          usedStock: 0,
          totalPrice: 5000,
          description: 'Premium oats for horses',
          nutritionInfo: {
            protein: 12,
            carbs: 60,
            fats: 5,
            fiber: 12,
            calories: 3200,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await feedCollection.insertMany(feedItems);
      this.logger.log('✅ Feed inventory seeded successfully');
    } catch (error) {
      this.logger.error('❌ Failed to seed feed inventory:', error);
      throw error;
    }
  }

  /**
   * Run all seeders
   */
  async runSeeders() {
    this.logger.log('🌱 Starting database seeding...');
    
    try {
      await this.seedUsers();
      await this.seedVaccines();
      await this.seedFeedInventory();
      
      this.logger.log('🎉 All seeders completed successfully!');
    } catch (error) {
      this.logger.error('❌ Seeding failed:', error);
      throw error;
    }
  }
}
