import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreatorGuard } from 'src/common/guards/is_creator.guard';
import { UseGuards } from '@nestjs/common';

@ApiBearerAuth("token")
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @UseGuards(CreatorGuard)
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @UseGuards(CreatorGuard)
  @Get()
  findAll() {
    return this.schoolsService.findAll();
  }


  @UseGuards(CreatorGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(+id);
  }

  @UseGuards(CreatorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolsService.update(+id, updateSchoolDto);
  }

  @UseGuards(CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(+id);
  }
}
