import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { User, UserRolesType } from './user.entity';

@Schema()
export class UserDatabaseEntity {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: UserRolesType;
}

export type UserDocument = HydratedDocument<UserDatabaseEntity>;

export const UserSchema = SchemaFactory.createForClass(UserDatabaseEntity);

export type UserModel = Model<UserDatabaseEntity>;
