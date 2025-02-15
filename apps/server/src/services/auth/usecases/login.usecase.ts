import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../auth.dtos';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'src/database';
import { IUser } from 'src/domain';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @InjectModel('User') private readonly userModel: UserModel,
    private readonly jwtService: JwtService,
  ) {}
  async execute(loginUserDto: LoginUserDto): Promise<any> {
    const user: IUser = await this.userModel
      .findOne({ email: loginUserDto.email })
      .lean()
      .exec();

    if (!user) throw new UnauthorizedException('Invalid email ');
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const jwtPayload = {
      sub: user._id.toString(),
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);
    return { accessToken: jwtToken };
  }
}
