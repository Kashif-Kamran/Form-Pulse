import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { IResourceDocument } from '@repo/shared';
import { UploadedFileInfo } from '../interfaces/file-metadata.interface';
import { ResourceDocumentService } from '../services/resource-document.service';

@Injectable()
export class UploadFileUseCase {
  constructor(
    private readonly resourceDocumentService: ResourceDocumentService,
  ) {}

  async execute(file: UploadedFileInfo): Promise<IResourceDocument> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    if (!this.isValidPdfFile(file)) {
      throw new BadRequestException('Only PDF files are allowed');
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 100MB limit');
    }

    // Check if we already have 20 PDFs uploaded
    const existingDocuments = await this.resourceDocumentService.findAll();
    if (existingDocuments.length >= 20) {
      throw new BadRequestException(
        'Maximum limit of 20 PDFs reached. Please delete some files before uploading new ones.',
      );
    }

    // Create document data
    const documentData: Partial<IResourceDocument> = {
      id: uuidv4(),
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `/resources/files/${file.filename}`,
      uploadDate: new Date(),
    };

    // Save to database
    const savedDocument =
      await this.resourceDocumentService.create(documentData);
    return savedDocument;
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
}
