import { Channel } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChannelDto } from './dto/channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  // create new channel
  async create(ChannelDto: ChannelDto): Promise<Channel> {
    const channel = await this.prismaService.channel.create({
      data: ChannelDto,
    });
    return channel;
  }

  // fetch all channels
  async findAll(): Promise<Channel[]> {
    const channels = await this.prismaService.channel.findMany();
    return channels;
  }

  // fetch channel by Id
  async findOne(id: string): Promise<Channel> {
    const channel = await this.prismaService.channel.findUnique({
      where: { id },
    });

    return channel;
  }

  async update(
    id: string,
    updateChannelDto: UpdateChannelDto,
  ): Promise<Channel> {
    const channel = await this.prismaService.channel.update({
      data: updateChannelDto,
      where: { id },
    });
    return channel;
  }

  async deleteChannel(id: string): Promise<Channel> {
    const channel = await this.prismaService.channel.delete({ where: { id } });

    return channel;
  }
}
