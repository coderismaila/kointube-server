import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { VideoService } from '../video/services/video.service';
import { ActionService } from 'src/video/services/action.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, VideoService, PrismaService, ActionService],
})
export class UsersModule {}
