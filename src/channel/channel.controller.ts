import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelDto } from './dto/channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@ApiTags('Channel')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post('/')
  create(@Body() channelDto: ChannelDto) {
    return this.channelService.create(channelDto);
  }

  @Get('/')
  findAll() {
    return this.channelService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.channelService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelService.update(id, updateChannelDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.channelService.deleteChannel(id);
  }
}
