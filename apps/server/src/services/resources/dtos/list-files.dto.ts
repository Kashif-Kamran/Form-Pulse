import { FileResponseDto } from './upload-file.dto';

export class ListFilesResponseDto {
  success: boolean;
  message: string;
  data: FileResponseDto[];
  count: number;

  constructor(files: FileResponseDto[], message = 'Files retrieved successfully') {
    this.success = true;
    this.message = message;
    this.data = files;
    this.count = files.length;
  }
}
