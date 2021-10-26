import { Video } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { ActionService } from './action.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly actionService: ActionService,
  ) {}

  async createVideo(createVideoDto: CreateVideoDto): Promise<Video> {
    // check if video with title already exist
    const videoExists = await this.prismaService.video.findFirst({
      where: { title: createVideoDto.title },
    });

    if (videoExists) {
      throw new BadRequestException(`video with title already exists`);
    }

    // create video
    const video = await this.prismaService.video.create({
      data: createVideoDto,
    });

    return video;
  }

  findVideoByUserId(authorid: string) {
    return this.prismaService.video.findMany({
      where: { authorid },
      include: { _count: true },
    });
  }

  async findAllVideo(): Promise<Video[]> {
    const videos = await this.prismaService.video.findMany({
      include: { author: true, _count: true },
    });

    return videos;
  }

  async findAllVideoByChannel(id: string) {
    const videos = await this.prismaService.video.findMany({
      where: { authorid: id },
      include: { author: true, _count: true },
    });

    return videos;
  }

  async findVideoById(videoid: string, userid: string): Promise<any> {
    const video = await this.prismaService.video.findUnique({
      where: { id: videoid },
      include: { author: true, _count: true },
    });

    if (!video) throw new NotFoundException(`video does not exist`);

    const views = await this.actionService.view({
      userid,
      videoid: video.id,
    });

    const userLiked = await this.prismaService.like.findFirst({
      where: { userid, videoid },
    });

    const userDisiked = await this.prismaService.dislike.findFirst({
      where: { userid, videoid },
    });

    video._count.View = views.views;

    return { ...video, liked: !!userLiked, disliked: !!userDisiked };
  }

  async updateVideo(id: string, updateVideoDto: UpdateVideoDto) {
    const video = await this.prismaService.video.update({
      data: updateVideoDto,
      where: { id },
      include: { author: true, _count: true },
    });

    return video;
  }

  async deleteVideo(id: string) {
    const video = await this.prismaService.video.delete({
      where: { id },
      include: { author: true, _count: true },
    });

    return video;
  }
}
