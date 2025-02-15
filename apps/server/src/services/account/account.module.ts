import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { GetProfileUseCase } from './usecases/get-profile.usecase';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [GetProfileUseCase],
})
export class AccountModule {}
