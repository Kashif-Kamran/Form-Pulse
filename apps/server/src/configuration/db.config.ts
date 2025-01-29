import { registerAs } from '@nestjs/config';

export type DatabaseConfigurations = {
  url: string;
};

export default registerAs(
  'database',
  (): DatabaseConfigurations => ({
    url: process.env.DB_URL || 'mongodb://localhost:27017/resume-tracker',
  }),
);
