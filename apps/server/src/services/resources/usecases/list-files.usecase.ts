import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { FileMetadata } from '../interfaces/file-metadata.interface';

@Injectable()
export class ListFilesUseCase {
  private readonly uploadsPath = path.join(process.cwd(), '..', '..', 'uploads', 'resources');

  execute(): FileMetadata[] {
    if (!fs.existsSync(this.uploadsPath)) {
      return [];
    }

    const files = fs.readdirSync(this.uploadsPath);
    const fileList: FileMetadata[] = [];

    for (const filename of files) {
      const filePath = path.join(this.uploadsPath, filename);
      const stats = fs.statSync(filePath);

      // Only include PDF files
      if (stats.isFile() && filename.toLowerCase().endsWith('.pdf')) {
        // Extract original name from filename if possible
        // Format: timestamp-randomstring.pdf
        const originalName = this.extractOriginalName(filename);

        const fileMetadata: FileMetadata = {
          filename: filename,
          originalName: originalName,
          size: stats.size,
          uploadDate: stats.mtime, // Use file modification time as upload date
          url: `/resources/files/${filename}`,
          mimetype: 'application/pdf',
        };

        fileList.push(fileMetadata);
      }
    }

    // Sort by upload date (newest first)
    fileList.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    return fileList;
  }

  private extractOriginalName(filename: string): string {
    // If filename follows our pattern (timestamp-randomstring.pdf),
    // we can't extract the original name, so we'll use the filename
    // In a real application, you might store this in a database
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);
    
    // Check if it matches our generated pattern (timestamp-randomstring)
    const generatedPattern = /^\d{13}-[a-z0-9]{6}$/;
    if (generatedPattern.test(nameWithoutExt)) {
      // This is a generated filename, use it as is
      return filename;
    }
    
    // Otherwise, it might be an original name
    return filename;
  }
}
