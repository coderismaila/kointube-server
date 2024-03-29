import { History } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createHistoryDto: CreateHistoryDto): Promise<History> {
    return this.prismaService.history.create({
      data: createHistoryDto,
      include: {
        video: {
          include: {
            _count: true,
            author: true,
          },
        },
      },
    });
  }

  findAll(): Promise<History[]> {
    return this.prismaService.history.findMany({
      include: { video: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findByUserId(userid: string): Promise<History[]> {
    return this.prismaService.history.findMany({
      where: {
        userid,
      },
      include: {
        video: {
          include: {
            _count: true,
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOneById(id: string): Promise<History> {
    return this.prismaService.history.findFirst({
      where: { id },
      include: {
        video: {
          include: {
            _count: true,
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  update(id: string, updateHistoryDto: UpdateHistoryDto): Promise<History> {
    return this.prismaService.history.update({
      where: { id },
      data: updateHistoryDto,
      include: {
        video: {
          include: {
            _count: true,
            author: true,
          },
        },
      },
    });
  }

  remove(id: string): Promise<History> {
    return this.prismaService.history.delete({
      where: { id },
      include: {
        video: {
          include: {
            _count: true,
            author: true,
          },
        },
      },
    });
  }
}
