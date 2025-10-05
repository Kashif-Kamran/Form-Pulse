import { FileResponseDto } from './upload-file.dto';

export class ListFilesResponseDto {
  results: FileResponseDto[];
  count: number;

  constructor(files: FileResponseDto[]) {
    this.results = files;
    this.count = files.length;
  }
}
