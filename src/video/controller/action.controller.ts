import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActionDto } from '../dto/video-actions.dto';
import { ActionService } from '../services/action.service';

/**
 * This route is for videos action such as view , dislike and like
 */
@ApiTags('videos action')
@Controller('video/action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  // this route is responsible for inserting user in view table
  @UseGuards(JwtAuthGuard)
  @Post('view')
  viewVideo(@Body() actionDto: ActionDto, @Request() req) {
    actionDto.userid = req.user.id;
    return this.actionService.view(actionDto);
  }

  // this route is responsible for liking a video
  @UseGuards(JwtAuthGuard)
  @Post('like')
  likeVideo(@Body() actionDto: ActionDto, @Request() req) {
    actionDto.userid = req.user.id;
    return this.actionService.like(actionDto);
  }

  // this route is responsible for disliking a video
  @UseGuards(JwtAuthGuard)
  @Post('dislike')
  dislikeVideo(@Body() actionDto: ActionDto, @Request() req) {
    actionDto.userid = req.user.id;
    return this.actionService.dislike(actionDto);
  }
}
