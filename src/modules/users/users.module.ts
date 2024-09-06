import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BullModule } from '@nestjs/bull';
import { EmailQueue } from './queues/email.queue';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueueAsync({ name: 'email' }),
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService, EmailQueue],
  controllers: [UsersController],
})
export class UsersModule {}
