import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeworksService {
  constructor(private prisma: PrismaService) {}
  create(createHomeworkDto: CreateHomeworkDto) {
    const subject = this.prisma.subject.findUnique({ where: { id: createHomeworkDto.subjectId } });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    const homework = this.prisma.homework.findUnique({ where: { id: createHomeworkDto.subjectId } });
    if (!homework) {
      throw new NotFoundException('Homework not found');
    }
    const createdHomework = this.prisma.homework.create({
      data: createHomeworkDto,
    });
    if (!createdHomework) {
      throw new NotFoundException('Homework not found');
    }
    return createdHomework;
  }

  findAll() {
    return this.prisma.homework.findMany({
      include: {
        Subject: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.homework.findUnique({ where: { id },include:{
      Subject:true
    } });
  }

  update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    const homework = this.prisma.homework.findUnique({ where: { id } });
    if (!homework) {
      throw new NotFoundException('Homework not found');
    }
    const updatedHomework = this.prisma.homework.update({
      where: { id },
      data: updateHomeworkDto,
    });
    if (!updatedHomework) {
      throw new NotFoundException('Homework not found');
    }
    return updatedHomework;
  }

  remove(id: number) {
    const homework = this.prisma.homework.findUnique({ where: { id } });
    if (!homework) {
      throw new NotFoundException('Homework not found');
    }
    const deletedHomework = this.prisma.homework.delete({ where: { id } });
    if (!deletedHomework) {
      throw new NotFoundException('Homework not found');
    }
    return deletedHomework;
  }
}
