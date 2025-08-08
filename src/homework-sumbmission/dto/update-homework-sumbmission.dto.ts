import { PartialType } from '@nestjs/swagger';
import { CreateHomeworkSumbmissionDto } from './create-homework-sumbmission.dto';

export class UpdateHomeworkSumbmissionDto extends PartialType(CreateHomeworkSumbmissionDto) {}
