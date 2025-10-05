import { Injectable } from '@nestjs/common';
import { IResourceDocument } from '@repo/shared';
import { ResourceDocumentService } from '../services/resource-document.service';

@Injectable()
export class ListFilesUseCase {
  constructor(
    private readonly resourceDocumentService: ResourceDocumentService,
  ) {}

  async execute(): Promise<IResourceDocument[]> {
    const documents = await this.resourceDocumentService.findAll();
    return documents;
  }
}
