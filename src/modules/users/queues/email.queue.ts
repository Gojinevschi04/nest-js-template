import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
@Processor('email')
export class EmailQueue {
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  async sendEmail(job: Job<{ to: string; subject: string; text: string }>) {
    const { data } = job;
    const { to, subject, text } = data;

    console.log(444);
    await this.mailerService.sendMail({
      to,
      subject,
      text: 'email content',
      context: { text },
    });
  }
}
