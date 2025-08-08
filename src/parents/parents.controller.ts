import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ApiBearerAuth } from "@nestjs/swagger";
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth("token")
@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}



  @UseGuards(AdminGuard)
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.parentsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentsService.update(+id, updateParentDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentsService.remove(+id);
  }
}
