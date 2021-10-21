import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { VideoService } from 'src/video/video.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly videoService: VideoService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/videos')
  video(@Request() req) {
    return this.videoService.findVideoByUserId(req.user.id);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/signup')
  register(@Body() userDto: UserDto) {
    return this.authService.signup(userDto);
  }

  @Post('/signout')
  signout() {}
}
