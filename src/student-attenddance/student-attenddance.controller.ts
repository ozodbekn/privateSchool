import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentAttenddanceService } from './student-attenddance.service';
import { CreateStudentAttenddanceDto } from './dto/create-student-attenddance.dto';
import { UpdateStudentAttenddanceDto } from './dto/update-student-attenddance.dto';
import { ApiBearerAuth } from "@nestjs/swagger";
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth("token")
@Controller('student-attenddance')
export class StudentAttenddanceController {
  constructor(private readonly studentAttenddanceService: StudentAttenddanceService) {}

  @Post()
  create(@Body() createStudentAttenddanceDto: CreateStudentAttenddanceDto) {
    return this.studentAttenddanceService.create(createStudentAttenddanceDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.studentAttenddanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentAttenddanceService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentAttenddanceDto: UpdateStudentAttenddanceDto) {
    return this.studentAttenddanceService.update(+id, updateStudentAttenddanceDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentAttenddanceService.remove(+id);
  }
}
