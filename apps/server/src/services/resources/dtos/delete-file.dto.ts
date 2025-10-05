export class DeleteFileResponseDto {
  message: string;
  deletedAt: string;
  filename: string;

  constructor(filename: string, deleted: boolean, message = 'File deleted successfully') {
    this.message = message;
    this.deletedAt = new Date().toISOString();
    this.filename = filename;
  }
}
