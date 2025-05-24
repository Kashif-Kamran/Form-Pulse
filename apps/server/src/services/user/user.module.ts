import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GetUsersList } from './usecases/get-users-list.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [GetUsersList],
})
export class UserModule {}
