import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { VideoService } from 'src/video/video.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, VideoService, PrismaService],
})
export class UsersModule {}
