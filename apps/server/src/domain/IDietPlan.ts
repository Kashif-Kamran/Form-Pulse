import * as mongoose from 'mongoose';

export interface IDietPlan {
  _id?: mongoose.Types.ObjectId;
  animal: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  nutrientBreakdown: Record<string, any>;
  notes?: string;
}
