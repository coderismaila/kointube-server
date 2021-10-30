import { Module } from '@nestjs/common';
import { VideoService } from './services/video.service';
import { VideoController } from './controller/video.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ActionController } from './controller/action.controller';
import { ActionService } from './services/action.service';
import { HistoryService } from 'src/history/history.service';

@Module({
  controllers: [VideoController, ActionController],
  providers: [
    ActionService,
    VideoService,
    UsersService,
    PrismaService,
    HistoryService,
  ],
})
export class VideoModule {}
