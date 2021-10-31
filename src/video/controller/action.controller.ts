import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentDto } from '../dto/comment.dto';
import { ReplyDto } from '../dto/reply.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { UpdateReplyDto } from '../dto/update-reply.dto';
import { ActionDto } from '../dto/video-actions.dto';
import { ActionService } from '../services/action.service';

/**
 * This route is for videos action such as view , dislike and like
 */
@ApiTags('videos action')
@Controller('video/action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('comment')
  createComment(@Body() commentDto: CommentDto, @Request() req) {
    commentDto.userid = req.user.id;
    return this.actionService.createComment(commentDto);
  }

  @Get('comment/:videoid')
  getComments(@Param('videoid') videoid: string) {
    return this.actionService.findCommentByVideoId(videoid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('comment/:id')
  updateComment(
    @Param('id') id: string,
    @Body() updateComment: UpdateCommentDto,
  ) {
    return this.actionService.updateComment(id, updateComment);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('comment/:id')
  deleteComment(@Param('id') id: string) {
    return this.actionService.deleteComment(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reply')
  createReply(@Body() replyDto: ReplyDto, @Request() req) {
    replyDto.userid = req.user.id;
    return this.actionService.createReply(replyDto);
  }

  @Get('reply/:commentid')
  getreplies(@Param('commentid') commentid: string) {
    return this.actionService.findAllReplyByCommentId(commentid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reply/:id')
  updateReply(@Param('id') id: string, @Body() updateReply: UpdateReplyDto) {
    return this.actionService.updateReply(id, updateReply);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('reply/:id')
  deleteReply(@Param('id') id: string) {
    return this.actionService.deleteReply(id);
  }
  // this route is responsible for inserting user in view table
  @UseGuards(JwtAuthGuard)
  @Post('view')
  createVideo(@Body() actionDto: ActionDto, @Request() req) {
    actionDto.userid = req.user.id;
    return this.actionService.view(actionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('views')
  getAllViewsCount() {}

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
