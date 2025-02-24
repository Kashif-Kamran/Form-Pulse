import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { IFeedInventory } from '@repo/shared';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

export type FeedInventoryDocument = HydratedDocument<IFeedInventory>;

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
})
export class FeedInventory implements IFeedInventory {
  declare _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  availableQuantity: number;

  @Prop()
  unitPrice: number;

  get id(): string {
    return this._id.toString();
  }
}
export const FeedInventorySchema = SchemaFactory.createForClass(FeedInventory);

FeedInventorySchema.virtual('id').get(function () {
  return this._id.toString();
});

export type FeedInventoryModel = Model<FeedInventory>;
