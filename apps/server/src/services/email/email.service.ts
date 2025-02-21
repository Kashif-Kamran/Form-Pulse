import { Injectable, Logger } from '@nestjs/common';
import { createTransport, Transporter, SentMessageInfo } from 'nodemailer';
import { TypedConfigService } from 'src/configuration/configuration.module';
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transpoter: Transporter;

  constructor(private readonly configService: TypedConfigService) {
    this.transpoter = createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_FROM'),
        pass: this.configService.get('EMAIL_CLIENT_PASSWORD'),
      },
    });
  }

  async sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }) {
    const info = await this.transpoter
      .sendMail({
        from: this.configService.get('EMAIL_FROM'),
        to,
        subject,
        text,
        html: html ?? text,
      })
      .then((info: SentMessageInfo) => {
        this.logger.log('✅ Email sent successfully : ' + info.messageId);
      })
      .catch((error) => {
        this.logger.error('❌ Failed to send email : ', error);
      });
  }
}
