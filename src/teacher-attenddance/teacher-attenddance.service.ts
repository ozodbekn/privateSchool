import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherAttenddanceDto } from './dto/create-teacher-attenddance.dto';
import { UpdateTeacherAttenddanceDto } from './dto/update-teacher-attenddance.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeacherAttenddanceService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTeacherAttenddanceDto: CreateTeacherAttenddanceDto) {
    const { status, teachersId } = createTeacherAttenddanceDto;
    const teacher= await this.prisma.teachers.findUnique({ where: { id: teachersId } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

  const teacherAttendance = await this.prisma.teacherAttendance.create({

      data: {
        status,
        teachersId,
      },
    });

    return teacherAttendance;
  }

  findAll() {
    return this.prisma.teacherAttendance.findMany({select:{id:true,status:true,teachersId:true}});
  }

  findOne(id: number) {
    return this.prisma.teacherAttendance.findUnique({ where: { id },select:{id:true,status:true,teachersId:true} });
  }

  update(id: number, updateTeacherAttenddanceDto: UpdateTeacherAttenddanceDto) {
    const { status, teachersId } = updateTeacherAttenddanceDto;
    const teacherAttenddance= this.prisma.teacherAttendance.update({
      where: { id },
      data: {
        status,
        teachersId,
      },
    });
    return teacherAttenddance;
  }

  remove(id: number) {
    return this.prisma.teacherAttendance.delete({ where: { id } });
  }
}
