import { Video } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(private readonly prismaService: PrismaService) {}

  async createVideo(createVideoDto: CreateVideoDto): Promise<Video> {
    // check if video with title already exist
    const videoExists = await this.prismaService.video.findFirst({
      where: { title: createVideoDto.title },
    });

    if (videoExists) {
      throw new BadRequestException(
        `video with title ${createVideoDto.title} already exists`,
      );
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
    });
  }

  async findAllVideo(): Promise<Video[]> {
    const videos = await this.prismaService.video.findMany();

    return videos;
  }

  async findVideoById(id: string): Promise<Video> {
    const video = await this.prismaService.video.findUnique({ where: { id } });

    if (!video)
      throw new BadRequestException(`video with id ${id} does not exist`);

    return video;
  }

  async updateVideo(id: string, updateVideoDto: UpdateVideoDto) {
    const video = await this.prismaService.video.update({
      data: updateVideoDto,
      where: { id },
    });

    return video;
  }

  async deleteVideo(id: string) {
    const video = await this.prismaService.video.delete({ where: { id } });

    return video;
  }
}
