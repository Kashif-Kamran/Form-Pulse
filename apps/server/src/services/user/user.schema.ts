import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
export class UserDatabaseEntity {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = HydratedDocument<UserDatabaseEntity>;

export const UserSchema = SchemaFactory.createForClass(UserDatabaseEntity);

export type UserModel = Model<UserDatabaseEntity>;
