import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { IFeedInventory } from '@repo/shared';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

export type FeedInventoryDocument = HydratedDocument<IFeedInventory>;

@Schema({ _id: false }) // _id: false because it's an embedded subdocument
export class NutritionInfo {
  @Prop({ required: true })
  protein: number;

  @Prop({ required: true })
  carbs: number;

  @Prop({ required: true })
  fats: number;

  @Prop({ required: true })
  fiber: number;

  @Prop({ required: true })
  calories: number;
}

export const NutritionInfoSchema = SchemaFactory.createForClass(NutritionInfo);

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
})
export class FeedInventory implements IFeedInventory {
  declare _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  remainingStock: number;

  @Prop({ required: true })
  usedStock: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({
    required: false,
    description: 'Optional description of the feed item',
  })
  description?: string;

  @Prop({
    required: false,
    description: 'Crude protein percentage in feed (e.g., 14.5 means 14.5%)',
  })
  @Prop({ type: NutritionInfoSchema, required: false })
  nutritionInfo: NutritionInfo;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deletedAt?: Date;

  get id(): string {
    return this._id.toString();
  }
}

export const FeedInventorySchema = SchemaFactory.createForClass(FeedInventory);

FeedInventorySchema.virtual('id').get(function () {
  return this._id.toString();
});

export type FeedInventoryModel = Model<FeedInventory>;
