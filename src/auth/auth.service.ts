import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { timeStamp } from 'console';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  generateToken(payload: string): string {
    return this.jwtService.sign(payload);
  }

  validateUser(email: string, password: string) {}

  tokenResponder(id: string) {
    return this.generateToken(id);
  }

  login(loginDto: LoginDto) {}
  async signup(userDto: UserDto) {
    const userByUserName = await this.userService.findByUserName(
      userDto.username,
    );
    const userByEmail = await this.userService.findByUserName(userDto.email);

    // checking if the email registered
    if (userByUserName) throw new BadRequestException('Username already taken');

    // checking if the email is already registered
    if (userByEmail) throw new BadRequestException('Email already taken');

    const user = await this.userService.create(userDto);

    return this.tokenResponder(user.id);
  }
}
