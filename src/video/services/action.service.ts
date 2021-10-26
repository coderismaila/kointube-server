import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ActionDto } from '../dto/video-actions.dto';

@Injectable()
export class ActionService {
  constructor(private readonly prismaService: PrismaService) {}

  async view(actionDto: ActionDto) {
    const views = await this.prismaService.view.findFirst({
      where: {
        userid: actionDto.userid,
      },
    });

    let viewCount = 0;

    if (views) {
      viewCount = await this.getViewCount(actionDto.videoid);
      return {
        views: viewCount,
      };
    }
    await this.prismaService.view.create({
      data: actionDto,
    });

    viewCount = await this.getViewCount(actionDto.videoid);
    return {
      views: viewCount,
    };
  }

  getViewCount(videoid: string): Promise<number> {
    return this.prismaService.view.count({
      where: { videoid },
    });
  }

  async like(actionDto: ActionDto) {}
  async dislike(actionDto: ActionDto) {}
}
