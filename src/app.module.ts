import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot(), ChannelModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
