import { IsNotEmpty, IsString, IsNumber, IsDateString, IsUrl } from 'class-validator';
import { FileMetadata } from '../interfaces/file-metadata.interface';

export class FileResponseDto implements FileMetadata {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  originalName: string;

  @IsNumber()
  size: number;

  uploadDate: Date;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  constructor(data: FileMetadata) {
    this.filename = data.filename;
    this.originalName = data.originalName;
    this.size = data.size;
    this.uploadDate = data.uploadDate;
    this.url = data.url;
    this.mimetype = data.mimetype;
  }
}

export class UploadFileResponseDto {
  success: boolean;
  message: string;
  data: FileResponseDto;

  constructor(fileMetadata: FileMetadata, message = 'File uploaded successfully') {
    this.success = true;
    this.message = message;
    this.data = new FileResponseDto(fileMetadata);
  }
}
