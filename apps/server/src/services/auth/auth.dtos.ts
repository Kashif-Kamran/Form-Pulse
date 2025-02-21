import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { UserRoles, UserRolesType } from 'src/domain';
export class RegisterUserRequestDto {
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn([UserRoles.Caretaker, UserRoles.Nutritionist, UserRoles.Veterinarian], {
    each: true,
  })
  roles: UserRolesType[];
}

export class VerifyOtpReq {
  @IsNotEmpty({})
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  otp: Number;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
