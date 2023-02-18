import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ProductModule } from 'src/product/product.module';
import { ProductSeed } from 'src/product/product.seed';
import { UsersModule } from 'src/users/users.module';
import { UsersSeed } from 'src/users/users.seed';

@Module({
  imports: [CommandModule, UsersModule, ProductModule],
  providers: [UsersSeed, ProductSeed],
  exports: [UsersSeed, ProductSeed],
})
export class SeedsModule {}
