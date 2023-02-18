import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { serverConfig } from './config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, serverConfig],
    }),
    MongooseModule.forRoot(serverConfig().status === 'prod' ? databaseConfig().uri_prod : databaseConfig().uri_dev),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
