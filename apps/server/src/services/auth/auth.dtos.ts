import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import {
  CreateUserReq,
  EmailPassReq,
  RoleType,
  VerifyOtpReq,
} from '@repo/shared';
export class RegisterUserRequestDto implements CreateUserReq {
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([RoleType.CareTaker, RoleType.Nutritionist, RoleType.Veterinarian])
  role: RoleType;
}

export class OtpVerificationDto implements VerifyOtpReq {
  @IsNotEmpty({})
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  otp: number;
}

export class LoginUserDto implements EmailPassReq {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
