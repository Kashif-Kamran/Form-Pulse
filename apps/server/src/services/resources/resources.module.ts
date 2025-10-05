import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourcesController } from './resources.controller';
import { UploadFileUseCase } from './usecases/upload-file.usecase';
import { ListFilesUseCase } from './usecases/list-files.usecase';
import { ServeFileUseCase } from './usecases/serve-file.usecase';
import { DeleteFileUseCase } from './usecases/delete-file.usecase';
import { ResourceDocumentService } from './services/resource-document.service';
import { UploadsDirectoryService } from './services/uploads-directory.service';
import { ResourceDocumentSchema } from '../../database/models/resource-document.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ResourceDocument', schema: ResourceDocumentSchema },
    ]),
  ],
  controllers: [ResourcesController],
  providers: [
    UploadsDirectoryService,
    ResourceDocumentService,
    UploadFileUseCase,
    ListFilesUseCase,
    ServeFileUseCase,
    DeleteFileUseCase,
  ],
  exports: [
    UploadsDirectoryService,
    ResourceDocumentService,
    UploadFileUseCase,
    ListFilesUseCase,
    ServeFileUseCase,
    DeleteFileUseCase,
  ],
})
export class ResourcesModule {}
