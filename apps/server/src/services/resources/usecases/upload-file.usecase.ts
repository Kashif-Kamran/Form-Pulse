import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { FileMetadata, UploadedFileInfo } from '../interfaces/file-metadata.interface';

@Injectable()
export class UploadFileUseCase {
  private readonly uploadsPath = path.join(process.cwd(), '..', '..', 'uploads', 'resources');

  constructor() {
    // Ensure uploads directory exists
    this.ensureUploadsDirectory();
  }

  private ensureUploadsDirectory(): void {
    if (!fs.existsSync(this.uploadsPath)) {
      fs.mkdirSync(this.uploadsPath, { recursive: true });
    }
  }

  execute(file: UploadedFileInfo): FileMetadata {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    if (!this.isValidPdfFile(file)) {
      throw new BadRequestException('Only PDF files are allowed');
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 10MB limit');
    }

    // Generate unique filename
    const uniqueFilename = this.generateUniqueFilename(file.originalname);
    
    // Create file metadata
    const fileMetadata: FileMetadata = {
      filename: uniqueFilename,
      originalName: file.originalname,
      size: file.size,
      uploadDate: new Date(),
      url: `/resources/files/${uniqueFilename}`,
      mimetype: file.mimetype,
    };

    return fileMetadata;
  }

  private isValidPdfFile(file: UploadedFileInfo): boolean {
    // Check MIME type
    if (file.mimetype !== 'application/pdf') {
      return false;
    }

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
      return false;
    }

    return true;
  }

  private generateUniqueFilename(originalName: string): string {
    const ext = path.extname(originalName);
    const timestamp = Date.now();
    const uuid = uuidv4().split('-')[0]; // Use first part of UUID for brevity
    return `${timestamp}-${uuid}${ext}`;
  }
}
