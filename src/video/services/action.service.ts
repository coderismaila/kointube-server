import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ActionDto } from '../dto/video-actions.dto';

@Injectable()
export class ActionService {
  constructor(private readonly prismaService: PrismaService) {}

  async view(actionDto: ActionDto) {}
  async like(actionDto: ActionDto) {}
  async dislike(actionDto: ActionDto) {}
}
