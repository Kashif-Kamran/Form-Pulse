import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { IResourceDocument } from '@repo/shared';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

export type ResourceDocumentDocument = HydratedDocument<ResourceDocument>;

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
})
export class ResourceDocument implements IResourceDocument {
  declare _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true, default: 'application/pdf' })
  mimetype: string;

  @Prop({ required: true })
  uploadDate: Date;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deletedAt?: Date | null;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  get mongoId(): string {
    return this._id.toString();
  }
}

export const ResourceDocumentSchema = SchemaFactory.createForClass(ResourceDocument);

ResourceDocumentSchema.virtual('mongoId').get(function () {
  return this._id.toString();
});

export type ResourceDocumentModel = Model<ResourceDocument>;
