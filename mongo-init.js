// MongoDB initialization script
print('Starting database initialization...');

// Switch to form-pulse database
db = db.getSiblingDB('form-pulse');

// Create a default user (optional)
// db.createUser({
//   user: 'app_user',
//   pwd: 'app_password',
//   roles: [
//     {
//       role: 'readWrite',
//       db: 'form-pulse'
//     }
//   ]
// });

// Create some initial collections if needed
db.createCollection('users');
db.createCollection('animals');
db.createCollection('dietplans');
db.createCollection('healthrecords');

print('Database initialization completed.');
