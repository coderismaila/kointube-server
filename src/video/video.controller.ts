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
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto, @Request() req) {
    console.log(req.user);
    // const authorid = req.user.id;
    // createVideoDto = { ...createVideoDto, authorid };

    return this.videoService.createVideo(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videoService.findAllVideo();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findVideoById(id);
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
