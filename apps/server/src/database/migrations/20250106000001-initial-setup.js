const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    // Create admin user
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    
    await db.collection('users').insertOne({
      name: 'System Administrator',
      email: 'admin@formpulse.com',
      password: adminPassword,
      role: 'Admin',
      isVerified: true,
      verificationOtp: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Seed comprehensive vaccine list
    const vaccines = [
      // Live Vaccines
      { name: 'Mukteswar (NDV)', type: 'Live', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Komarov (NDV)', type: 'Live', createdAt: new Date(), updatedAt: new Date() },
      { name: 'LaSota (NDV)', type: 'Live', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gumbo Vac. (IBD)', type: 'Live', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gumbo Vac. Forte (Hot)', type: 'Live', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ND + IB + Fowl Pox + IB', type: 'Live', createdAt: new Date(), updatedAt: new Date() },
      
      // Killed Vaccines
      { name: 'ND + Hydro Vaccine', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hydro Clear (Angara)', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'AI Plain (Aqua Base)', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'AI Oil Emulsion', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ND + AI Oil Emulsion', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ND Oil Emulsion', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'IBD Oil Emulsion', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ND + IBD Oil Emulsion', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ND + IB Oil Emulsion', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ND + IB + IBD Oil Emulsion', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ND + IB + H9 Oil Emulsion', type: 'Killed', createdAt: new Date(), updatedAt: new Date() },
      
      // Livestock Vaccines
      { name: 'HS Vaccine (Aqua Base & Oil Base)', type: 'Livestock', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ET Vaccine', type: 'Livestock', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mastitis Vaccine', type: 'Livestock', createdAt: new Date(), updatedAt: new Date() },
      { name: 'CCPP Vaccine', type: 'Livestock', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lumpy Vaccine', type: 'Livestock', createdAt: new Date(), updatedAt: new Date() },
      { name: 'PPR Vaccine', type: 'Livestock', createdAt: new Date(), updatedAt: new Date() },
      
      // Bactrin
      { name: 'E. coli Vaccine (Aqua Base)', type: 'Bactrin', createdAt: new Date(), updatedAt: new Date() },
      
      // Biologics
      { name: 'Sterile Diluent', type: 'Biologics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Normal Saline', type: 'Biologics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Distilled Water', type: 'Biologics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Floor Cleaner', type: 'Biologics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Surface Cleaner', type: 'Biologics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Glass Cleaner', type: 'Biologics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hand Wash Liquid', type: 'Biologics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hand Sanitizer', type: 'Biologics', createdAt: new Date(), updatedAt: new Date() },
    ];

    await db.collection('vaccines').insertMany(vaccines);

    // Add soft delete fields to existing collections
    const collections = ['animals', 'dietplans', 'animalhealthrecords'];
    
    for (const collectionName of collections) {
      await db.collection(collectionName).updateMany(
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
    }

    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ role: 1 });
    await db.collection('animals').createIndex({ isDeleted: 1 });
    await db.collection('dietplans').createIndex({ animal: 1 });
    await db.collection('dietplans').createIndex({ isDeleted: 1 });
    await db.collection('animalhealthrecords').createIndex({ animal: 1 });
    await db.collection('animalhealthrecords').createIndex({ isDeleted: 1 });
    await db.collection('vaccines').createIndex({ type: 1 });
    await db.collection('vaccines').createIndex({ name: 1 });

    console.log('✅ Initial migration completed successfully');
    console.log(`📋 Seeded ${vaccines.length} vaccines across 5 categories`);
  },

  async down(db, client) {
    // Remove admin user
    await db.collection('users').deleteOne({ email: 'admin@formpulse.com' });
    
    // Remove all seeded vaccines
    await db.collection('vaccines').deleteMany({});
    
    // Remove soft delete fields
    const collections = ['animals', 'dietplans', 'animalhealthrecords'];
    
    for (const collectionName of collections) {
      await db.collection(collectionName).updateMany(
        {},
        { 
          $unset: {
            isDeleted: '',
            deletedAt: ''
          }
        }
      );
    }

    // Drop indexes
    await db.collection('users').dropIndex({ email: 1 });
    await db.collection('users').dropIndex({ role: 1 });
    await db.collection('animals').dropIndex({ isDeleted: 1 });
    await db.collection('dietplans').dropIndex({ animal: 1 });
    await db.collection('dietplans').dropIndex({ isDeleted: 1 });
    await db.collection('animalhealthrecords').dropIndex({ animal: 1 });
    await db.collection('animalhealthrecords').dropIndex({ isDeleted: 1 });
    await db.collection('vaccines').dropIndex({ type: 1 });
    await db.collection('vaccines').dropIndex({ name: 1 });

    console.log('✅ Initial migration rolled back successfully');
  }
};
