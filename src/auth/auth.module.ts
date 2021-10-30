import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/utils/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { VideoService } from '../video/services/video.service';
import { ActionService } from 'src/video/services/action.service';
import { HistoryService } from 'src/history/history.service';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [
    HistoryService,
    AuthService,
    UsersService,
    VideoService,
    PrismaService,
    JwtStrategy,
    ActionService,
    ConfigService,
  ],
})
export class AuthModule {}
