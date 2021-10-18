import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(userDto: UserDto): Promise<User> {
    return this.prismaService.user.create({
      data: userDto,
    });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findByUserName(username: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }

  updateUser(id: string, userDto: UserDto): Promise<User> {
    return this.prismaService.user.update({
      data: userDto,
      where: { id },
    });
  }

  deleteUser(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
