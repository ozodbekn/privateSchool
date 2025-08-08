import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSubjectDto: CreateSubjectDto) {
    const { name, description, teachersId, classesId } = createSubjectDto;
    const teacher = await this.prisma.teachers.findUnique({ where: { id: teachersId } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    const classes = await this.prisma.classes.findUnique({ where: { id: classesId } });
    if (!classes) {
      throw new NotFoundException('Class not found');
    }
    return this.prisma.subject.create({
      data: {
        name,
        description,
        teachersId,
        classesId,
      },
    });
  }

  findAll() {
    return this.prisma.subject.findMany({
      include: {
        Teachers: true,
        Classes: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.subject.findUnique({ where: { id } ,include: {
      Teachers: true,
      Classes: true,
    }});
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.prisma.subject.update({
      where: { id },
      data: {
        ...updateSubjectDto,
        teachersId: updateSubjectDto.teachersId,
        classesId: updateSubjectDto.classesId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.subject.delete({ where: { id } });
  }
}
