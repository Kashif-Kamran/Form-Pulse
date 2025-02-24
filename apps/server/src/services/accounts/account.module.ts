import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GetProfileUseCase } from './usecases/get-profile.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [GetProfileUseCase],
})
export class AccountsModule {}
