import { Module } from '@nestjs/common';

import { UserService } from './app/services/user.service';
import { UserController } from './infra/controllers/user.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
