import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypedConfigService } from 'src/configuration/configuration.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async (configService: TypedConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
