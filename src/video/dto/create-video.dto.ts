import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Length, IsDate, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({ required: true, example: 'mak23' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  @Length(5)
  title: string;

  @ApiProperty({ required: true, example: 'https://videourl.mp4' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  videoUrl: string;

  @ApiProperty({ required: true, example: 'https://videourl.mp4' })
  @IsNotEmpty()
  thumbnailUrl: string;

  @ApiProperty({ required: true, example: 'https://videourl.mp4' })
  // @IsNotEmpty()
  authorid: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
