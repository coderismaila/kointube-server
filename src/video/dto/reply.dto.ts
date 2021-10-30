import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ReplyDto {
  @ApiProperty({ required: true, example: 'nice reply bla bla' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  content: string;

  @ApiProperty({ required: true, example: 'dsfdsf3rrrf43trdv' })
  @IsNotEmpty()
  commentid: string;

  userid: string;
}
