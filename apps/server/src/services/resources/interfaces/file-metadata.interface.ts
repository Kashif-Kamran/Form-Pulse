export interface FileMetadata {
  id?: string;
  filename: string;
  originalName: string;
  size: number;
  uploadDate: Date;
  url: string;
  mimetype: string;
}

export interface UploadedFileInfo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
