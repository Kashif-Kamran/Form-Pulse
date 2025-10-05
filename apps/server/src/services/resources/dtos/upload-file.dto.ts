import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsUrl,
} from 'class-validator';
import { ResourceDocumentPublic } from '@repo/shared';
import { FileMetadata } from '../interfaces/file-metadata.interface';

export class FileResponseDto implements ResourceDocumentPublic {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  originalName: string;

  @IsNumber()
  size: number;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  uploadDate: Date;

  @IsString()
  @IsNotEmpty()
  url: string;

  constructor(data: FileMetadata) {
    this.id = data.id || Date.now().toString(); // Generate ID if not provided
    this.filename = data.filename;
    this.originalName = data.originalName;
    this.size = data.size;
    this.uploadDate = data.uploadDate;
    this.url = data.url;
    this.mimetype = data.mimetype;
  }
}

export class UploadFileResponseDto extends FileResponseDto {
  constructor(fileMetadata: FileMetadata) {
    super(fileMetadata);
  }
}
