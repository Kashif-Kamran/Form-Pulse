const { config } = require('dotenv');
const path = require('path');

// Load environment variables
config({ path: path.resolve(__dirname, '.env') });

const mongoUrl = process.env.DATABASE_URL;

if (!mongoUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

module.exports = {
  mongodb: {
    url: mongoUrl,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  // The migrations dir, can be an relative or absolute path
  migrationsDir: 'src/database/migrations',
  // The mongodb collection where the applied changes are stored
  changelogCollectionName: 'changelog',
  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js',
  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run. Requires that scripts are coded to be run multiple times.
  useFileHash: false,
  // Don't change this, unless you know what you're doing
  moduleSystem: 'commonjs',
};
