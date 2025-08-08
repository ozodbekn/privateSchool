import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeacherAttenddanceService } from './teacher-attenddance.service';
import { CreateTeacherAttenddanceDto } from './dto/create-teacher-attenddance.dto';
import { UpdateTeacherAttenddanceDto } from './dto/update-teacher-attenddance.dto';
import { ApiBearerAuth } from "@nestjs/swagger";
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth("token")
@Controller('teacher-attenddance')
export class TeacherAttenddanceController {
  constructor(private readonly teacherAttenddanceService: TeacherAttenddanceService) {}

  @Post()
  create(@Body() createTeacherAttenddanceDto: CreateTeacherAttenddanceDto) {
    return this.teacherAttenddanceService.create(createTeacherAttenddanceDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.teacherAttenddanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherAttenddanceService.findOne(+id);
  }
  

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherAttenddanceDto: UpdateTeacherAttenddanceDto) {
    return this.teacherAttenddanceService.update(+id, updateTeacherAttenddanceDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherAttenddanceService.remove(+id);
  }
}
