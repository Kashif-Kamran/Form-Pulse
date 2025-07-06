import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GetUsersList } from './usecases/get-users-list.usecase';
import { CreateUserByAdmin } from './usecases/create-user-by-admin.usecase';
import { UpdateUser } from './usecases/update-user.usecase';
import { DeleteUser } from './usecases/delete-user.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [GetUsersList, CreateUserByAdmin, UpdateUser, DeleteUser],
})
export class UserModule {}
