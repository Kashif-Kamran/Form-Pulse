export class DeleteFileResponseDto {
  success: boolean;
  message: string;
  data: {
    filename: string;
    deleted: boolean;
  };

  constructor(
    filename: string,
    deleted: boolean,
    message = 'File deleted successfully'
  ) {
    this.success = deleted;
    this.message = message;
    this.data = {
      filename,
      deleted,
    };
  }
}
