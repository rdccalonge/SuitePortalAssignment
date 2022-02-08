import { AuthDao } from './auth.dao';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthDao,
  ],
})
export class AuthModule {}
