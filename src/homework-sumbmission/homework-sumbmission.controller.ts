import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HomeworkSumbmissionService } from './homework-sumbmission.service';
import { CreateHomeworkSumbmissionDto } from './dto/create-homework-sumbmission.dto';
import { UpdateHomeworkSumbmissionDto } from './dto/update-homework-sumbmission.dto';
import { ApiBearerAuth } from "@nestjs/swagger";
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth("token")
@Controller('homework-sumbmission')
export class HomeworkSumbmissionController {
  constructor(private readonly homeworkSumbmissionService: HomeworkSumbmissionService) {}

  @Post()
  create(@Body() createHomeworkSumbmissionDto: CreateHomeworkSumbmissionDto) {
    return this.homeworkSumbmissionService.create(createHomeworkSumbmissionDto);
  }


  @UseGuards(AdminGuard)
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.homeworkSumbmissionService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworkSumbmissionService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeworkSumbmissionDto: UpdateHomeworkSumbmissionDto) {
    return this.homeworkSumbmissionService.update(+id, updateHomeworkSumbmissionDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeworkSumbmissionService.remove(+id);
  }
}
