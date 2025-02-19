// src/models/diet-plan.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IDietPlan } from 'src/domain';
export type DietPlanDocument = HydratedDocument<DietPlan>;

@Schema({ timestamps: true })
export class DietPlan implements IDietPlan {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animal: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ type: Object, required: true })
  nutrientBreakdown: Record<string, any>;

  @Prop()
  notes?: string;
}

export const DietPlanSchema = SchemaFactory.createForClass(DietPlan);
