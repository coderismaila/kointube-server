import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { hashPassword, comparePassword } from 'src/utils/password.bcrypt';
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

  // validateUser(email: string, password: string) {}

  tokenResponder(id: string) {
    const token = this.generateToken(id);
    return { token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.usernameOrEmail(loginDto.username);

    if (!user) throw new BadRequestException('Invalid credentials');

    const passwordMatch: boolean = await comparePassword(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) throw new BadRequestException('Invalid credentials');

    // generating token
    return this.tokenResponder(user.id);
  }

  async signup(userDto: UserDto) {
    const userByUserName = await this.userService.findByUserName(
      userDto.username,
    );
    const userByEmail = await this.userService.findByEmail(userDto.email);

    // checking if the email registered
    if (userByUserName) throw new BadRequestException('Username already taken');

    // checking if the email is already registered
    if (userByEmail) throw new BadRequestException('Email already taken');

    // hashing password
    userDto.password = await hashPassword(userDto.password);

    // registering user
    const user = await this.userService.create(userDto);

    // returning the token
    return this.tokenResponder(user.id);
  }
}
