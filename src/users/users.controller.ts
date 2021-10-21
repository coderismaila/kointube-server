import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('/channel')
  getAllChannelWithVideo() {
    return this.usersService.findAllChannelWithVideo();
  }

  @Get('/id/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('/username/:username')
  getUserByUserName(@Param('username') username: string) {
    return this.usersService.findByEmail(username);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.usersService.updateUser(id, userDto);
  }

  @Delete('/:id')
  deleteUSer(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
