import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsDirectoryService implements OnModuleInit {
  private readonly uploadsPath = path.join(
    process.cwd(),
    '..',
    '..',
    'uploads',
  );

  private readonly resourcesPath = path.join(
    this.uploadsPath,
    'resources',
  );

  onModuleInit() {
    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist(): void {
    try {
      // Create main uploads directory if it doesn't exist
      if (!fs.existsSync(this.uploadsPath)) {
        fs.mkdirSync(this.uploadsPath, { recursive: true });
        console.log('✅ Created uploads directory:', this.uploadsPath);
      }

      // Create resources subdirectory if it doesn't exist
      if (!fs.existsSync(this.resourcesPath)) {
        fs.mkdirSync(this.resourcesPath, { recursive: true });
        console.log('✅ Created resources directory:', this.resourcesPath);
      }

      console.log('📁 Upload directories verified successfully');
    } catch (error) {
      console.error('❌ Failed to create upload directories:', error);
      throw error;
    }
  }

  getUploadsPath(): string {
    return this.uploadsPath;
  }

  getResourcesPath(): string {
    return this.resourcesPath;
  }
}
