import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from '../services/video.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createVideoDto: CreateVideoDto, @Request() req) {
    createVideoDto.authorid = req.user.id;

    return this.videoService.createVideo(createVideoDto);
  }

  @Get('/channel_video_count/:id')
  getChannelVideoCount(@Param('id') authorid: string) {
    return this.videoService.getChannelVideoCount(authorid);
  }

  @Get('/total_video_count')
  totalVideoCount() {
    return this.videoService.getAllVideosCount();
  }

  @Get()
  findAll() {
    return this.videoService.findAllVideo();
  }

  @Get('/channel/:id')
  findAllChannelVideo(@Param('id') id: string) {
    return this.videoService.findAllVideoByChannel(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.videoService.findVideoById(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
    @Request() req,
  ) {
    updateVideoDto.authorid = req.user.id;
    return this.videoService.updateVideo(id, updateVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.deleteVideo(id);
  }
}
