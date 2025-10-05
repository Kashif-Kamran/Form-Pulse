import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { UploadFileUseCase } from './usecases/upload-file.usecase';
import { ListFilesUseCase } from './usecases/list-files.usecase';
import { ServeFileUseCase } from './usecases/serve-file.usecase';
import { DeleteFileUseCase } from './usecases/delete-file.usecase';

@Module({
  controllers: [ResourcesController],
  providers: [UploadFileUseCase, ListFilesUseCase, ServeFileUseCase, DeleteFileUseCase],
  exports: [UploadFileUseCase, ListFilesUseCase, ServeFileUseCase, DeleteFileUseCase],
})
export class ResourcesModule {}
