import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchoolsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSchoolDto: CreateSchoolDto) {
    return this.prisma.school.create({ data: createSchoolDto });
  }

  findAll() {
    return this.prisma.school.findMany();
  }

  findOne(id: number) {
    return this.prisma.school.findUnique({ where: { id } });
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return this.prisma.school.update({
      where: { id },
      data: updateSchoolDto,
    });
  }

  remove(id: number) {
    return this.prisma.school.delete({ where: { id } });
  }
}
