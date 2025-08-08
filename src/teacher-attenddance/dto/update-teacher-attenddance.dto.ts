import { PartialType } from '@nestjs/swagger';
import { CreateTeacherAttenddanceDto } from './create-teacher-attenddance.dto';

export class UpdateTeacherAttenddanceDto extends PartialType(CreateTeacherAttenddanceDto) {}
