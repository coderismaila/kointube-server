import { PartialType } from '@nestjs/swagger';
import { ReplyDto } from './reply.dto';
export class UpdateReplyDto extends PartialType(ReplyDto) {}
