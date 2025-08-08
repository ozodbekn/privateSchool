import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmartQueryService } from './smart-query.service';
import { CreateSmartQueryDto } from './dto/create-smart-query.dto';
import { UpdateSmartQueryDto } from './dto/update-smart-query.dto';

@Controller('smart-query')
export class SmartQueryController {
  constructor(private readonly smartQueryService: SmartQueryService) {}

  @Get("existStudentsListByAttendance")
  existStudentsListByAttendance() {
    return this.smartQueryService.existStudentsListByAttendance();
  }

  @Get("NoexistStudentsListByAttendanceWithout")
  NoexistStudentsListByAttendanceWithout() {
    return this.smartQueryService.NoexistStudentsListByAttendanceWithout();
  }

  @Get("NoexistStudentsListByAttendanceDueToReason")
  NoexistStudentsListByAttendanceDueToReason() {
    return this.smartQueryService.NoexistStudentsListByAttendanceDueToReason();
  }

  @Get("findExpiredContracts")
  findExpiredContracts() {
    return this.smartQueryService.findExpiredContracts();
  }

  @Get("findContractsByStudentID")
  findContractsByStudentID(@Body() ID: number) {
    return this.smartQueryService.findContractsByStudentID(+ID);
  }

  @Get("findExpiredHomeWorks")
  findExpiredHomeWorks() {
    return this.smartQueryService.findExpiredHomeWorks();
  }



}
