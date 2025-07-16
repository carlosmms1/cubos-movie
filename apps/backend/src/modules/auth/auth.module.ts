import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './app/services/auth.service';
import { AuthController } from './infra/controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { LocalStrategy } from './app/strategies/local.strategy';
import { JwtStrategy } from './app/strategies/jwt.strategy';

@Module({
  imports: [UserModule, SharedModule, PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
