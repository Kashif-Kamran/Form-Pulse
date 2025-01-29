import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/services/user/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const authToken = request.headers.authorization;
    if (!authToken) throw new UnauthorizedException();
    const token = authToken.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    try {
      const decodedPaylaod = await this.jwtService.verify(token);
      const authenticatedUser = this.userRepository.findById(
        decodedPaylaod.sub,
      );
      if (!authenticatedUser) throw new UnauthorizedException();
      request.user = authenticatedUser;
      return true;
    } catch (error) {
      console.log('Error : ', error);
      throw new UnauthorizedException();
    }
  }
}
