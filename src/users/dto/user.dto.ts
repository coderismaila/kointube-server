import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UserDto {
  // validating email to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'mak23',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  username: string;

  @ApiProperty({
    required: false,
    example: 'My channel name',
  })
  @IsOptional()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  channel_name: string;

  // checking if email is empty or not
  @ApiProperty({
    required: true,
    example: 'example@mail.com',
  })
  @IsEmail()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  email: string;

  // validating country to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'Nigeria',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  country: string;

  // validating if the form data is a valid email
  @ApiProperty({
    required: true,
    example: '12345678  ',
  })
  @Length(8)
  password: string;
}
