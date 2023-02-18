import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { serverConfig } from './config/server.config';
import { SeedsModule } from './shared/seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, serverConfig],
    }),
    MongooseModule.forRoot(
      serverConfig().status === 'prod'
        ? databaseConfig().uri_prod
        : databaseConfig().uri_dev,
    ),
    AuthModule,
    UsersModule,
    ProductModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
