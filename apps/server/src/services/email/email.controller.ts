import { Controller, Logger, LoggerService, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { TypedConfigService } from 'src/configuration/configuration.module';
import { Public } from '../auth/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('email')
export class EmailController {
  constructor(
    private readonly configService: TypedConfigService,
    private readonly emailService: EmailService,
  ) {}

  @Post('send')
  @Public()
  async sendEmail() {
    await this.emailService.sendEmail({
      to: this.configService.get('EMAIL_FROM'),
      subject: 'Test Email',
      text: 'This is a test email',
    });
  }
}
