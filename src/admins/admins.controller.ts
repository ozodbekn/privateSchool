import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto';
import { ApiBearerAuth } from "@nestjs/swagger";
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreatorGuard } from 'src/common/guards/is_creator.guard';
import { AdminSelfGuard } from 'src/common/guards/admin.self.guard';

@ApiBearerAuth("token")
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}


  @UseGuards(CreatorGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @UseGuards(AdminSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @UseGuards(CreatorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @UseGuards(CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
