import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authConfig } from 'src/config/auth.config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: authConfig().jwtAccessSecret
    }),

  ],
  providers: [AuthService]
})
export class AuthModule {}
