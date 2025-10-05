import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResourceDocument, ResourceDocumentDocument } from '../../../database/models/resource-document.model';
import { IResourceDocument } from '@repo/shared';

@Injectable()
export class ResourceDocumentService {
  constructor(
    @InjectModel('ResourceDocument')
    private readonly resourceDocumentModel: Model<ResourceDocumentDocument>,
  ) {}

  async create(documentData: Partial<IResourceDocument>): Promise<ResourceDocument> {
    const document = new this.resourceDocumentModel({
      ...documentData,
      uploadDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return document.save();
  }

  async findAll(): Promise<ResourceDocument[]> {
    return this.resourceDocumentModel
      .find({ isDeleted: { $ne: true } })
      .sort({ uploadDate: -1 })
      .exec();
  }

  async findById(id: string): Promise<ResourceDocument | null> {
    return this.resourceDocumentModel
      .findOne({ id, isDeleted: { $ne: true } })
      .exec();
  }

  async findByFilename(filename: string): Promise<ResourceDocument | null> {
    return this.resourceDocumentModel
      .findOne({ filename, isDeleted: { $ne: true } })
      .exec();
  }

  async deleteById(id: string): Promise<ResourceDocument | null> {
    return this.resourceDocumentModel
      .findOneAndUpdate(
        { id, isDeleted: { $ne: true } },
        { 
          isDeleted: true, 
          deletedAt: new Date(),
          updatedAt: new Date()
        },
        { new: true }
      )
      .exec();
  }

  async deleteByFilename(filename: string): Promise<ResourceDocument | null> {
    return this.resourceDocumentModel
      .findOneAndUpdate(
        { filename, isDeleted: { $ne: true } },
        { 
          isDeleted: true, 
          deletedAt: new Date(),
          updatedAt: new Date()
        },
        { new: true }
      )
      .exec();
  }

  async hardDeleteByFilename(filename: string): Promise<ResourceDocument | null> {
    return this.resourceDocumentModel
      .findOneAndDelete({ filename })
      .exec();
  }
}
