import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CategoryModule } from 'src/category/category.module';
import { CategorySeed } from 'src/category/category.seed';
import { ProductModule } from 'src/product/product.module';
import { ProductSeed } from 'src/product/product.seed';
import { UsersModule } from 'src/users/users.module';
import { UsersSeed } from 'src/users/users.seed';

@Module({
  imports: [CommandModule, UsersModule, ProductModule, CategoryModule],
  providers: [UsersSeed, ProductSeed, CategorySeed],
  exports: [UsersSeed, ProductSeed, CategorySeed],
})
export class SeedsModule {}
