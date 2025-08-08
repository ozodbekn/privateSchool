import { Injectable } from '@nestjs/common';
import { CreateSmartQueryDto } from './dto/create-smart-query.dto';
import { UpdateSmartQueryDto } from './dto/update-smart-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SmartQueryService {
  constructor(private readonly prisma: PrismaService) {}

//aqlli so'rovlar yoz
  findInActiveStudents() {
    return this.prisma.students.findMany({
      where: {
        status: "inactive",
      },
    });
  }

  findExpiredContracts() {
    return this.prisma.contract.findMany({
      where: {
        end_date: {
          lt: new Date().toISOString(),
        },
      },
    });
  }

  async findContractsByStudentID(ID: number) {
    const contracts = await this.prisma.contract.findMany({});
    return contracts.filter((contract) => contract.studentsId === ID);
  }


  async findExpiredHomeWorks() {
    return this.prisma.homework.findMany({
      where: {
        due_date: {
          lt: new Date().toISOString(),
        },
      },
    });
  }

  async existStudentsListByAttendance() {
    const students = await this.prisma.students.findMany({})
    students.forEach((student) => {
      this.prisma.studentAttenddance.findFirst({
        where: {
          studentsId: student.id,
          status:"KELGAN"
        },
      });
    });
    return students;
  }

  async NoexistStudentsListByAttendanceWithoutReason() {
    const students = await this.prisma.students.findMany({})
    students.forEach((student) => {
      this.prisma.studentAttenddance.findFirst({
        where: {
          studentsId: student.id,
          status:"SABABSIZ_KELMAGAN"
        },
      });
    });
    return students;
  }
  async NoexistStudentsListByAttendanceDueToReason() {
    const students = await this.prisma.students.findMany({})
    students.forEach((student) => {
      this.prisma.studentAttenddance.findFirst({
        where: {
          studentsId: student.id,
          status:"SABABLI_KELMAGAN"
        },
      });
    });
    return students;
  }


}
