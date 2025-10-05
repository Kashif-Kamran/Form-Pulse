import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class DeleteFileUseCase {
  private readonly uploadsPath = path.join(process.cwd(), '..', '..', 'uploads', 'resources');

  execute(filename: string): { filename: string; deleted: boolean; message: string } {
    // Validate filename to prevent path traversal attacks
    if (!this.isValidFilename(filename)) {
      throw new NotFoundException('Invalid filename');
    }

    const filePath = path.join(this.uploadsPath, filename);

    // Check if file exists and is within the uploads directory
    if (!this.isFileInUploadsDirectory(filePath)) {
      throw new NotFoundException('File not found or access denied');
    }

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    const stats = fs.statSync(filePath);

    // Ensure it's a file and not a directory
    if (!stats.isFile()) {
      throw new NotFoundException('File not found');
    }

    // Only delete PDF files
    if (!filename.toLowerCase().endsWith('.pdf')) {
      throw new NotFoundException('File type not supported');
    }

    try {
      // Delete the file
      fs.unlinkSync(filePath);

      return {
        filename: filename,
        deleted: true,
        message: 'File deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  private isValidFilename(filename: string): boolean {
    // Basic filename validation
    if (!filename || filename.trim() === '') {
      return false;
    }

    // Check for path traversal attempts
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return false;
    }

    // Check for valid PDF extension
    if (!filename.toLowerCase().endsWith('.pdf')) {
      return false;
    }

    return true;
  }

  private isFileInUploadsDirectory(filePath: string): boolean {
    // Resolve both paths to absolute paths
    const resolvedFilePath = path.resolve(filePath);
    const resolvedUploadsPath = path.resolve(this.uploadsPath);

    // Check if the file path starts with the uploads directory path
    return resolvedFilePath.startsWith(resolvedUploadsPath + path.sep);
  }
}
