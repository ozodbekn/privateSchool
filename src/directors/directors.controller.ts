import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { ApiBearerAuth } from "@nestjs/swagger";
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreatorGuard } from 'src/common/guards/is_creator.guard';

@ApiBearerAuth("token")
@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @UseGuards(AdminGuard, CreatorGuard)
  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorsService.create(createDirectorDto);
  }

  @UseGuards(AdminGuard, CreatorGuard)
  @UseGuards(AdminGuard, CreatorGuard)
  @Get()
  findAll() {
    return this.directorsService.findAll();
  }

  @UseGuards(AdminGuard, CreatorGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorsService.findOne(+id);
  }

  @UseGuards(AdminGuard, CreatorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorsService.update(+id, updateDirectorDto);
  }

  @UseGuards(AdminGuard, CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorsService.remove(+id);
  }
}
