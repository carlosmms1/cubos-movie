import { Module } from '@nestjs/common';

import { MailService } from './app/services/mail.service';
import { StorageService } from './app/services/storage.service';

@Module({
  providers: [MailService, StorageService],
  exports: [MailService, StorageService],
})
export class SharedModule {}
