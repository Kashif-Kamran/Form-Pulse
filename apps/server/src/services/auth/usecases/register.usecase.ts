import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from '../auth.dtos';
import { UserModel } from 'src/database';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, RoleType, UserResponse } from '@repo/shared';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/services/email/email.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @InjectModel('User') private readonly userModel: UserModel,
    private readonly emailService: EmailService,
  ) {}

  private generateOtp(): Number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async execute(
    registerUserDto: RegisterUserRequestDto,
  ): Promise<UserResponse> {
    const exsits: IUser = await this.userModel
      .findOne({ email: registerUserDto.email })
      .lean()
      .exec();
    if (exsits)
      throw new ConflictException('User with this email already exists.');

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const verificationOpt = this.generateOtp();

    const creationPayload: Partial<IUser> = {
      ...registerUserDto,
      password: hashedPassword,
      role: registerUserDto.role,
      isVerified: false,
      verificationOtp: verificationOpt,
    };

    const creationDbResponse = await this.userModel.create(creationPayload);

    // TODO: Refector to create email templates
    this.emailService.sendEmail({
      subject: 'Registration Verification OTP',
      to: creationDbResponse.email,
      text: `Your verification OTP is ${verificationOpt}`,
      html: `
      <h1>OTP for verification</h1>
      <p>Your verification OTP is <strong>${verificationOpt}</p>
      <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return {
      id: creationDbResponse.id,
      name: creationDbResponse.name,
      role: creationDbResponse.role,
      email: creationDbResponse.email,
      isVerified: creationDbResponse.isVerified,
    };
  }
}
