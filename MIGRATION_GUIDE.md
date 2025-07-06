# 🚀 **Migration & Seeding System Documentation**

## **Overview**
This project uses a comprehensive migration and seeding system to manage database schema changes and initial data setup.

## **🛠️ Available Commands**

### **Migration Commands**
```bash
# Create a new migration
npm run migration:create <migration-name>

# Run all pending migrations
npm run migration:up

# Rollback last migration
npm run migration:down

# Check migration status
npm run migration:status

# Run custom migration service
npm run migrate
```

### **Seeding Commands**
```bash
# Run all seeders
npm run seed

# Setup database (migrations + seeders)
npm run db:setup

# Reset database (rollback + migrate + seed)
npm run db:reset
```

## **📁 Directory Structure**
```
src/database/
├── migrations/           # Database migration files
├── seeders/             # Database seeder files
├── migration.service.ts # Custom migration service
├── migration.module.ts  # Migration module
└── seeder.service.ts    # Seeder service
```

## **🔐 Default Admin User**
After running migrations/seeders, you'll have a default admin user:

- **Email**: `admin@formpulse.com`
- **Password**: `Admin@123`
- **Role**: `Admin`

## **👥 Seeded Users**
The seeder creates the following test users:

1. **Admin**: admin@formpulse.com (Admin@123)
2. **Veterinarian**: vet@formpulse.com (Vet@123)
3. **Nutritionist**: nutritionist@formpulse.com (Nutri@123)
4. **Care Taker**: caretaker@formpulse.com (Care@123)

## **📊 What Gets Seeded**
- ✅ Admin and test users with different roles
- ✅ Comprehensive vaccine library (35+ vaccines):
  - **Live Vaccines**: Mukteswar (NDV), Komarov (NDV), LaSota (NDV), etc.
  - **Killed Vaccines**: ND + Hydro Vaccine, AI Oil Emulsion, etc.
  - **Livestock Vaccines**: HS Vaccine, ET Vaccine, Mastitis Vaccine, etc.
  - **Bactrin**: E. coli Vaccine (Aqua Base)
  - **Biologics**: Sterile Diluent, Hand Sanitizer, Cleaners, etc.
- ✅ Sample feed inventory items
- ✅ Database indexes for performance
- ✅ Soft delete fields on existing records

## **🚀 Quick Start**

### **For New Database**
```bash
# Setup everything from scratch
npm run db:setup
```

### **For Development**
```bash
# Run migrations only
npm run migrate

# Run seeders only  
npm run seed
```

### **For Production**
```bash
# Run migrations (seeders are optional in production)
npm run migration:up
```

## **📝 Creating New Migrations**

### **1. Using migrate-mongo**
```bash
npm run migration:create add-new-field
```

### **2. Migration File Structure**
```javascript
module.exports = {
  async up(db, client) {
    // Migration logic here
    await db.collection('users').updateMany(
      {},
      { $set: { newField: 'defaultValue' } }
    );
  },

  async down(db, client) {
    // Rollback logic here
    await db.collection('users').updateMany(
      {},
      { $unset: { newField: '' } }
    );
  }
};
```

## **🔧 Adding New Seeders**

### **1. Update SeederService**
```typescript
async seedNewData() {
  const collection = this.connection.collection('newcollection');
  
  const existingCount = await collection.countDocuments();
  if (existingCount > 0) {
    this.logger.warn('Data already exists, skipping');
    return;
  }

  const data = [
    { name: 'Sample', createdAt: new Date() }
  ];

  await collection.insertMany(data);
  this.logger.log('✅ New data seeded successfully');
}
```

### **2. Update runSeeders method**
```typescript
async runSeeders() {
  await this.seedUsers();
  await this.seedVaccines();
  await this.seedFeedInventory();
  await this.seedNewData(); // Add your new seeder
}
```

## **⚠️ Important Notes**

1. **Idempotent Operations**: All migrations and seeders are designed to be run multiple times safely
2. **Environment Variables**: Ensure `DATABASE_URL` is set in your `.env` file
3. **Backup First**: Always backup your database before running migrations in production
4. **Test Migrations**: Test migrations on a copy of production data first

## **🐛 Troubleshooting**

### **Migration Failed**
```bash
# Check migration status
npm run migration:status

# Rollback if needed
npm run migration:down

# Try again
npm run migration:up
```

### **Connection Issues**
- Verify `DATABASE_URL` in `.env`
- Ensure MongoDB is running
- Check network connectivity

### **Permission Issues**
- Ensure database user has proper permissions
- Check MongoDB authentication settings

## **🚀 Production Deployment**

### **1. Pre-deployment**
```bash
# Test migrations on staging
npm run migration:up

# Verify data integrity
npm run migration:status
```

### **2. Production Setup**
```bash
# Run migrations only (no seeders in production)
npm run migration:up

# Optional: Create admin user manually for security
```

## **📈 Best Practices**

1. **Version Control**: Always commit migration files
2. **Naming**: Use descriptive migration names with timestamps
3. **Testing**: Test migrations on development/staging first
4. **Rollback**: Always provide rollback logic in migrations
5. **Documentation**: Document complex migrations
6. **Monitoring**: Monitor migration execution in production

---

**🎉 Your database migration and seeding system is ready to use!**
