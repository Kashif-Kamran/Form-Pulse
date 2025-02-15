import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Mongoose } from 'mongoose';
import { UserModel } from 'src/database';

@Injectable()
export class GetProfileUseCase {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async execute(userId: string) {
    return await this.userModel
      .find({
        _id: new mongoose.Types.ObjectId(userId),
      })
      .select('-password -__v')
      .lean()
      .exec();
  }
}
