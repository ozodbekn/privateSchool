import { BadRequestException, Injectable } from "@nestjs/common";
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

    return newTeacher;
  }

  findAll() {
    return `This action returns all teachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
