import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService
  ) {}
  async create(createClassDto: CreateClassDto) {
    const classes = await this.prisma.classes.create({
      data: createClassDto,
    });
    return classes
  }

  async findAll() {
    return await this.prisma.classes.findMany({
      include: {
        School: true, 
        subject: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.classes.findUnique({
      where: {
        id,
      },
      include: {
        School: true, 
        subject: true,
      },
    });
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const classes = await this.findOne(id);
    if (!classes) {
      throw new NotFoundException('Class not found');
    } 
    return await this.prisma.classes.update({
      where: {
        id,
      },
      data: updateClassDto,
    });
  }

  async remove(id: number) {
    const classes = await this.findOne(id);
    if (!classes) {
      throw new NotFoundException('Class not found');
    } 
    return await this.prisma.classes.delete({
      where: {
        id,
      },
    });
  }
}
