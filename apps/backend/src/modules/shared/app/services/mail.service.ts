import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { ConfigService } from '@nestjs/config';

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('smtp.host'),
      port: this.configService.get<number>('smtp.port'),
      secure: false,
    });
  }

  async sendMail(options: MailOptions) {
    return await this.transporter.sendMail({
      from: 'no-reply@cubosmovie.com',
      ...options,
    });
  }
}
