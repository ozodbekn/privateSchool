import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStudentDto: CreateStudentDto) {
    const { full_name, ID, password, confirm_password, birthyear, parentsId, classesId } =
      createStudentDto;
          const exist = await this.prisma.idList.findFirst({ where: { ID } });
          if (exist) {
            throw new ConflictException("Bunday id lik foydalanuvchi bor!");
          }
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    
    const parent = await this.prisma.parents.findUnique({where:{id:parentsId}});
    if (!parent) {
      throw new NotFoundException("Parent not found");
    }

    const classes = await this.prisma.classes.findUnique({where:{id:classesId}});
    if (!classes) {
      throw new NotFoundException("Classes not found");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newStudent = await this.prisma.students.create({
      data: {
        ID,
        full_name,
        hashedPassword,
        birthyear,
        parentsId,
        classesId,
      },
    });
        await this.prisma.idList.create({
          data: { ID: ID },
        });

    return newStudent;
  }

  findAll() {
    return this.prisma.students.findMany({include:{Parents:true}});
  }

  findOne(id: number) {
    return this.prisma.students.findUnique({where:{id},include:{Parents:true}});
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.students.update({where:{id},data:updateStudentDto});
  }

async remove(id: number) {

  const student = await this.prisma.students.findUnique({where:{id}});
  if (!student) {
    throw new NotFoundException("Student not found");
  }

  await this.prisma.idList.delete({where:{ID:student.ID}});
    
    return this.prisma.students.delete({where:{id}});
  }
}
