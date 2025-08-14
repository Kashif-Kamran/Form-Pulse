import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../auth.dtos';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'src/database';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/database/models/user.model';
import { AuthResponse } from '@repo/shared';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @InjectModel('User') private readonly userModel: UserModel,
    private readonly jwtService: JwtService,
  ) {}
  async execute(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const user: UserDocument = await this.userModel.findOne({
      email: loginUserDto.email,
      isDeleted: { $ne: true }, // Exclude deleted users
    });

    if (!user) throw new UnauthorizedException('Invalid email or password');
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    // Email verification check removed - users can login without verification
    // Admin-created users are automatically verified, and we allow unverified users to login
    
    const jwtPayload = {
      sub: user._id,
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);
    return {
      access: {
        token: jwtToken,
      },
    };
  }
}
