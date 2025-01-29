import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserRequestDto } from '../user.dtos';
import { UserRepository } from '../user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserRequestDto): Promise<User> {
    const user = new User(
      '',
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    return this.userRepository.create(user);
  }
}
