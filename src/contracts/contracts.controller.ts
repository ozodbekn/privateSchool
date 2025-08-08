import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiBearerAuth } from "@nestjs/swagger";
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreatorGuard } from 'src/common/guards/is_creator.guard';

@ApiBearerAuth("token")
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @UseGuards(AdminGuard, CreatorGuard)
  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto);
  }

  @UseGuards(AdminGuard, CreatorGuard)
  @Get()
  findAll() {
    return this.contractsService.findAll();
  }

  @UseGuards(AdminGuard, CreatorGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(+id);
  }

  @UseGuards(AdminGuard, CreatorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractsService.update(+id, updateContractDto);
  }

  @UseGuards(AdminGuard, CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id);
  }
}
