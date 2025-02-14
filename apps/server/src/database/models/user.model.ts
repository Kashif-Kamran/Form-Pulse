import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { IUser, UserRolesType } from 'src/domain/IUser';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: UserRolesType;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<User>;
