import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

export class ChannelDto {
  @ApiProperty({
    required: true,
    example: 'arewa',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  name: string;

  @ApiProperty({
    required: true,
    example: 'xsjkjkjflkdekldlkd$ofi',
  })
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({
    required: false,
    example: 'channel for arewa content',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  @Length(20)
  description: string;
}
