import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedsModule } from './shared/seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService) => ({
        uri:
          configService.get('STATUS') === 'dev'
            ? configService.get('MONGO_URI_DEV')
            : configService.get('MONGO_URI_PROD'),
      }),
      inject: [ConfigService],
    }),
    AuthModule, UsersModule, SeedsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
