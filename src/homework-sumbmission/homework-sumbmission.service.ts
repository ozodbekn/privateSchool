import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkSumbmissionDto } from './dto/create-homework-sumbmission.dto';
import { UpdateHomeworkSumbmissionDto } from './dto/update-homework-sumbmission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeworkSumbmissionService {
  constructor(private readonly prisma: PrismaService) {}
   async  create(createHomeworkSumbmissionDto: CreateHomeworkSumbmissionDto) {
    const { file_url, comment, studentsId, homeworkId } =
      createHomeworkSumbmissionDto;
      const student = await this.prisma.students.findUnique({ where: { id: studentsId } });
      if (!student) {
        throw new NotFoundException('Student not found');
      }
      const homework = await this.prisma.homework.findUnique({ where: { id: homeworkId } });
      if (!homework) {
        throw new NotFoundException('Homework not found');
      }
    const homeworkSumbmission = await this.prisma.homeworkSumbmission.create({
      data: {
        file_url,
        comment,
        studentsId,
        homeworkId,
      },
    });
    if (!homeworkSumbmission) {
      throw new NotFoundException('Homework sumbmission not found');
    }
    return homeworkSumbmission;
  }

  findAll() {
    const homeworkSumbmission = this.prisma.homeworkSumbmission.findMany({
      include: {
        Students: true,
        Homework: true,
      },
    });
    if (!homeworkSumbmission) {
      throw new NotFoundException('Homework sumbmission not found');
    }
    return homeworkSumbmission;
  }

  findOne(id: number) {
    const homeworkSumbmission = this.prisma.homeworkSumbmission.findUnique({ where: { id }, include: { Students: true, Homework: true } });
    if (!homeworkSumbmission) {
      throw new NotFoundException('Homework sumbmission not found');
    }
    return homeworkSumbmission;
  }

  update(id: number, updateHomeworkSumbmissionDto: UpdateHomeworkSumbmissionDto) {
    const homeworkSumbmission = this.prisma.homeworkSumbmission.update({
      where: { id },
      data: updateHomeworkSumbmissionDto,
    });
    if (!homeworkSumbmission) {
      throw new NotFoundException('Homework sumbmission not found');
    }
    return homeworkSumbmission;
  }

  remove(id: number) {
    const homeworkSumbmission = this.prisma.homeworkSumbmission.delete({ where: { id } });
    if (!homeworkSumbmission) {
      throw new NotFoundException('Homework sumbmission not found');
    }
    return homeworkSumbmission;
  }
}
