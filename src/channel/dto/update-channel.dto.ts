import { PartialType } from '@nestjs/swagger';
import { ChannelDto } from './channel.dto';

export class UpdateChannelDto extends PartialType(ChannelDto) {
  id: string;
}
