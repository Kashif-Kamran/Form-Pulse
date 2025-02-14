import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from '../auth.dtos';
import { UserModel } from 'src/database';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, UserRoles } from 'src/domain/IUser';

@Injectable()
export class RegisterUserUseCase {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}
  async execute(
    registerUserDto: RegisterUserRequestDto,
  ): Promise<Omit<IUser, 'password'>> {
    const exsits: IUser = await this.userModel
      .findOne({ email: registerUserDto.email })
      .lean()
      .exec();
    if (exsits)
      throw new ConflictException('User with this email already exists.');

    // hash the password
    const creationPayload: IUser = {
      ...registerUserDto,
      role: UserRoles.Caretaker,
    };

    const creationDbResponse = await this.userModel.create(creationPayload);

    return {
      _id: creationDbResponse._id,
      name: creationDbResponse.name,
      role: creationDbResponse.role,
      email: creationDbResponse.email,
    };
  }
}
