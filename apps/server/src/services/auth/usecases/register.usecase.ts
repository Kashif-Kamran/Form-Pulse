import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from '../auth.dtos';
import { UserModel } from 'src/database';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, UserRoles } from 'src/domain';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}
  async execute(
    registerUserDto: RegisterUserRequestDto,
  ): Promise<Pick<IUser, '_id' | 'name' | 'roles' | 'email' | 'isVerified'>> {
    const exsits: IUser = await this.userModel
      .findOne({ email: registerUserDto.email })
      .lean()
      .exec();
    if (exsits)
      throw new ConflictException('User with this email already exists.');

    // hash the password
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const creationPayload: IUser = {
      ...registerUserDto,
      password: hashedPassword,
      roles: [UserRoles.Caretaker],
      isVerified: false,
    };

    const creationDbResponse = await this.userModel.create(creationPayload);

    return {
      _id: creationDbResponse._id,
      name: creationDbResponse.name,
      roles: creationDbResponse.roles,
      email: creationDbResponse.email,
      isVerified: creationDbResponse.isVerified,
    };
  }
}
