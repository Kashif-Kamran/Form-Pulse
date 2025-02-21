import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'src/database';
import { VerifyOtpReq } from '../auth.dtos';

@Injectable()
export class VerifyOtpUseCase {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async execute(verifyOtpDto: VerifyOtpReq) {
    const user = await this.userModel
      .findOne({ email: verifyOtpDto.email })
      .lean()
      .exec();

    if (!user || user.verificationOtp !== verifyOtpDto.otp) {
      throw new UnauthorizedException('Invalid OTP. Please try again');
    }

    await this.userModel.updateOne(
      { email: verifyOtpDto.email },
      { verificationOtp: null, isVerified: true },
    );

    return { message: 'User verified successfully' };
  }
}
