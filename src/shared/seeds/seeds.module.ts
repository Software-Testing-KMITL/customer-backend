import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UsersModule } from 'src/users/users.module';
import { UsersSeed } from 'src/users/users.seed';

@Module({
  imports: [CommandModule, UsersModule],
  providers: [UsersSeed],
  exports: [UsersSeed],

})
export class SeedsModule {}
