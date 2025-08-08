import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const { full_name, ID, password, confirm_password, diplom, phone_number } =
      createTeacherDto;

          const exist = await this.prisma.idList.findFirst({ where: { ID } });
          if (exist) {
            throw new ConflictException("Bunday id lik foydalanuvchi bor!");
          }

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newTeacher = await this.prisma.teachers.create({
      data: {
        full_name,
        ID,
        phone_number,
        diplom,
        hashedPassword,
      },
    });
        await this.prisma.idList.create({
          data: { ID: ID },
        });

    return newTeacher;
  }

  findAll() {
    return this.prisma.teachers.findMany({});
  }

  findOne(id: number) {
    return this.prisma.teachers.findUnique({where:{id}});
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.prisma.teachers.update({where:{id},data:updateTeacherDto});
  }

  async remove(id: number) {
    const teacher = await this.prisma.teachers.findUnique({where:{id}});
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }
    await this.prisma.idList.delete({where:{ID:teacher.ID}});
    return this.prisma.teachers.delete({where:{id}});
  }
}
