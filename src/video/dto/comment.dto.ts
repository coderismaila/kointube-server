import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  @ApiProperty({ required: true, example: 'nice vieo bla bla' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  content: string;

  @ApiProperty({ required: true, example: 'dsfdsf3rrrf43trdv' })
  @IsNotEmpty()
  videoid: string;

  userid: string;
}
