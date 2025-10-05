import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpCode,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { UploadFileUseCase } from './usecases/upload-file.usecase';
import { ListFilesUseCase } from './usecases/list-files.usecase';
import { ServeFileUseCase } from './usecases/serve-file.usecase';
import { DeleteFileUseCase } from './usecases/delete-file.usecase';
import { UploadFileResponseDto, FileResponseDto } from './dtos/upload-file.dto';
import { ListFilesResponseDto } from './dtos/list-files.dto';
import { DeleteFileResponseDto } from './dtos/delete-file.dto';
import { UploadedFileInfo } from './interfaces/file-metadata.interface';
import { Public } from '../auth/decorators/public.decorator';
import { RolesAllowed } from '../auth/decorators/roles-allowed.decorator';
import { RoleType } from '@repo/shared';

@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly uploadFileUseCase: UploadFileUseCase,
    private readonly listFilesUseCase: ListFilesUseCase,
    private readonly serveFileUseCase: ServeFileUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) {}

  @Post('upload')
  @HttpCode(201)
  @RolesAllowed(RoleType.SuperAdmin, RoleType.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(
            process.cwd(),
            '..',
            '..',
            'uploads',
            'resources',
          );
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          // Generate unique filename using timestamp and random string
          const timestamp = Date.now();
          const randomString = Math.random().toString(36).substring(2, 8);
          const ext = path.extname(file.originalname);
          const uniqueName = `${timestamp}-${randomString}${ext}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Allow only PDF files
        if (
          file.mimetype === 'application/pdf' &&
          file.originalname.toLowerCase().endsWith('.pdf')
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only PDF files are allowed'), false);
        }
      },
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponseDto> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Convert Express.Multer.File to our UploadedFileInfo interface
    const uploadedFileInfo: UploadedFileInfo = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      size: file.size,
    };

    // Process the file using our use case
    const fileMetadata = await this.uploadFileUseCase.execute(uploadedFileInfo);

    return new UploadFileResponseDto(fileMetadata);
  }

  @Get()
  @HttpCode(200)
  @Public()
  async listFiles(): Promise<ListFilesResponseDto> {
    const files = await this.listFilesUseCase.execute();
    const fileResponses = files.map((file) => new FileResponseDto(file));
    return new ListFilesResponseDto(fileResponses);
  }

  @Get('files/:filename')
  @HttpCode(200)
  @Public()
  async serveFile(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { filePath, stats, originalName } =
      await this.serveFileUseCase.execute(filename);

    // Use original name if available, otherwise use the filename
    const displayName = originalName || filename;

    // Set appropriate headers for PDF files
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': stats.size.toString(),
      'Content-Disposition': `inline; filename="${displayName}"`,
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    });

    // Create a readable stream and return it as StreamableFile
    const fileStream = fs.createReadStream(filePath);
    return new StreamableFile(fileStream);
  }

  @Delete(':filename')
  @HttpCode(200)
  @RolesAllowed(RoleType.SuperAdmin, RoleType.Admin)
  async deleteFile(
    @Param('filename') filename: string,
  ): Promise<DeleteFileResponseDto> {
    const result = await this.deleteFileUseCase.execute(filename);
    return new DeleteFileResponseDto(
      result.filename,
      result.deleted,
      result.message,
    );
  }
}
