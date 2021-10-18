import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  // validating email to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'mak23',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  username: string;

  // checking if email is empty or not
  @ApiProperty({
    required: true,
    example: 'example@mail.com',
  })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  email: string;

  // validating if the form data is a valid email
  @ApiProperty({
    required: true,
    example: '12345678  ',
  })
  @Length(8)
  password: string;
}
