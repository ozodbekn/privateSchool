import { PartialType } from '@nestjs/swagger';
import { CreateStudentAttenddanceDto } from './create-student-attenddance.dto';

export class UpdateStudentAttenddanceDto extends PartialType(CreateStudentAttenddanceDto) {}
