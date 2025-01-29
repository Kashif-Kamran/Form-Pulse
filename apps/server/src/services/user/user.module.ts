import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserRepository } from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [CreateUserUseCase, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
