import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLessonDto: CreateLessonDto) {
    const { start_time, end_time, dayofweek, studentsId, roomsId, subjectId } =
      createLessonDto;
      

      const student = await this.prisma.students.findUnique({ where: { id: studentsId } });
      if (!student) {
        throw new NotFoundException('Student not found');
      }

      const room = await this.prisma.rooms.findUnique({ where: { id: roomsId } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }

      const subject = await this.prisma.subject.findUnique({ where: { id: subjectId } });
      if (!subject) {
        throw new NotFoundException('Subject not found');
      }


    const lesson = await this.prisma.lesson.create({
      data: {
        start_time,
        end_time,
        dayofweek,
        studentsId:student.id,
        roomsId:room.id,
        subjectId:subject.id,
      },
    });
    return lesson;
  }

  findAll() {
    return this.prisma.lesson.findMany({
      include: {
        Students: true,
        Rooms: true,
        Subject: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  remove(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
