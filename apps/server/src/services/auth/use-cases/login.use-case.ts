import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../auth.dtos';
import { UserRepository } from 'src/services/user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async execute(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findByEmail(loginUserDto.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    if (user.getPassword() !== loginUserDto.password)
      throw new UnauthorizedException('Invalid email or password');

    const jwtPayload = {
      sub: user.id,
      username: user.name,
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return { accessToken: jwtToken };
  }
}
