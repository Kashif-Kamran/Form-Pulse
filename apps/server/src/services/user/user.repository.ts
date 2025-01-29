import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './user.schema';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  private toDomainEntity(userDocument: UserDocument): User {
    return new User(
      userDocument._id.toString(),
      userDocument.name,
      userDocument.email,
      userDocument.password,
    );
  }

  async create(user: User): Promise<User> {
    const userDocument = new this.userModel({
      ...user,
      password: user.getPassword(),
    });
    console.log('User Document : ', userDocument);
    const savedUser = await userDocument.save();
    return this.toDomainEntity(savedUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? this.toDomainEntity(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toDomainEntity(user) : null;
  }
}
