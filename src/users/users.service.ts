import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userDto: UserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: userDto,
    });
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    users.forEach((u) => {
      delete u.password;
    });

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    delete user.password;

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    delete user.password;

    return user;
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    delete user.password;

    return user;
  }

  async updateUser(id: string, userDto: UserDto): Promise<User> {
    const user = await this.prismaService.user.update({
      data: userDto,
      where: { id },
    });

    delete user.password;

    return user;
  }

  usernameOrEmail(username: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email: username }],
      },
    });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.prismaService.user.delete({ where: { id } });

    delete user.password;

    return user;
  }
}
