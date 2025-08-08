import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentAttenddanceDto } from './dto/create-student-attenddance.dto';
import { UpdateStudentAttenddanceDto } from './dto/update-student-attenddance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentAttenddanceService {
  constructor(private prisma: PrismaService) {}

    async create(createStudentAttenddanceDto: CreateStudentAttenddanceDto) {
      const student = await this.prisma.students.findUnique({ where: { id: createStudentAttenddanceDto.studentsId  } });
      if (!student) {
        throw new NotFoundException('Student not found');
      } 
    return this.prisma.studentAttenddance.create({
      data: createStudentAttenddanceDto,
    });
  }

  findAll() {
    return this.prisma.studentAttenddance.findMany();
  }

  findOne(id: number) {
    return this.prisma.studentAttenddance.findUnique({ where: { id } });
  }

  update(id: number, updateStudentAttenddanceDto: UpdateStudentAttenddanceDto) {
    return this.prisma.studentAttenddance.update({
      where: { id },
      data: updateStudentAttenddanceDto,
    });
  }

  remove(id: number) {
    return this.prisma.studentAttenddance.delete({ where: { id } });
  }
}
