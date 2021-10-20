import { Channel } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ChannelDto } from './dto/channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}

  // create new channel
  async create(channelDto: ChannelDto): Promise<Channel> {
    // check if channel name is already taken
    const channelExists = await this.prismaService.channel.findFirst({
      where: { name: channelDto.name },
    });

    if (channelExists)
      throw new BadRequestException('channel name already taken');

    // check if author already has a channel
    const authorExist = await this.userService.findById(channelDto.authorId);

    if (authorExist)
      throw new BadRequestException(
        `the author with id ${channelDto.authorId} already have a channel`,
      );

    const channel = await this.prismaService.channel.create({
      data: channelDto,
    });
    return channel;
  }

  // fetch all channels
  async findAll(): Promise<Channel[]> {
    const channels = await this.prismaService.channel.findMany();
    return channels;
  }

  // fetch channel by Id
  async findChannelById(id: string): Promise<Channel> {
    const channel = await this.prismaService.channel.findUnique({
      where: { id },
    });

    if (!channel)
      throw new BadRequestException(`channel with ${id} does not exist`);

    return channel;
  }

  async updateChannel(
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
