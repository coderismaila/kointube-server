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
        channelid: actionDto.channelid,
        videoid: actionDto.videoid,
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

  getLikeCount(videoid: string): Promise<number> {
    return this.prismaService.like.count({
      where: { videoid },
    });
  }

  getDislikeCount(videoid: string): Promise<number> {
    return this.prismaService.dislike.count({
      where: { videoid },
    });
  }

  async like(actionDto: ActionDto) {
    const likes = await this.prismaService.like.findFirst({
      where: { userid: actionDto.userid, videoid: actionDto.videoid },
    });

    const dislike = await this.prismaService.dislike.findFirst({
      where: { userid: actionDto.userid, videoid: actionDto.videoid },
    });

    if (dislike)
      await this.prismaService.dislike.delete({ where: { id: dislike.id } });

    if (likes) {
      await this.prismaService.like.delete({ where: { id: likes.id } });
      return { likes: await this.getLikeCount(actionDto.videoid) };
    } else {
      const likes = await this.prismaService.like.create({ data: actionDto });
      return { likes: await this.getLikeCount(likes.videoid) };
    }
  }

  async dislike(actionDto: ActionDto) {
    const dislike = await this.prismaService.dislike.findFirst({
      where: { userid: actionDto.userid, videoid: actionDto.videoid },
    });

    const like = await this.prismaService.like.findFirst({
      where: { userid: actionDto.userid, videoid: actionDto.videoid },
    });

    if (like) await this.prismaService.like.delete({ where: { id: like.id } });

    if (dislike) {
      await this.prismaService.dislike.delete({ where: { id: dislike.id } });
      return { dislikes: await this.getLikeCount(actionDto.videoid) };
    } else {
      const dislikes = await this.prismaService.dislike.create({
        data: actionDto,
      });
      return { dislikes: await this.getDislikeCount(dislikes.videoid) };
    }
  }
}
