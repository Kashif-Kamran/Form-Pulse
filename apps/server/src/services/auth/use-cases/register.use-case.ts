import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { RegisterUserRequestDto } from '../auth.dtos';
import { UserRepository } from 'src/services/user/user.repository';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(
    registerUserDto: RegisterUserRequestDto,
  ): Promise<Omit<User, '_password'>> {
    const exsits = await this.userRepository.findByEmail(registerUserDto.email);
    if (exsits)
      throw new ConflictException('User with this email already exists.');

    // hash the password
    const newUser = new User(
      '', // will be set by mongodb
      registerUserDto.name,
      registerUserDto.email,
      registerUserDto.password,
    );

    const creationDbResponse = this.userRepository.create(newUser);
    return (await creationDbResponse).getPublicFeils();
  }
}
