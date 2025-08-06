import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStudentDto: CreateStudentDto) {
    const { full_name, ID, password, confirm_password, birthyear } =
      createStudentDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newStudent = await this.prisma.students.create({
      data: {
        ID,
        full_name,
        hashedPassword,
        birthyear,
      },
    });

    return newStudent;
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
