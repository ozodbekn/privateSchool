import { PartialType } from '@nestjs/swagger';
import { CreateSmartQueryDto } from './create-smart-query.dto';

export class UpdateSmartQueryDto extends PartialType(CreateSmartQueryDto) {}
