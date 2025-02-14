import { Injectable } from '@nestjs/common';
import { User, UserRoles } from '../user.entity';
import { CreateUserRequestDto } from '../user.dtos';
import { UserRepository } from '../user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserRequestDto): Promise<User> {
    const user = new User({
      id: '',
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      role: UserRoles.Caretaker,
    });

    return this.userRepository.create(user);
  }
}
