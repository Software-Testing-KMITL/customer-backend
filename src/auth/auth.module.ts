import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtAccessTokenStrategy } from './jwt-access.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET')
      }),
      inject: [ConfigService] 
    }),
    UsersModule
  ],
  providers: [AuthService, JwtAccessTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
