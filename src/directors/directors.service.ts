import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDirectorDto } from "./dto/create-director.dto";
import { UpdateDirectorDto } from "./dto/update-director.dto";
import { CreateStudentDto } from "../students/dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class DirectorsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDirectorDto: CreateDirectorDto) {
    const { full_name, ID, password, phone_number, confirm_password, image } =
      createDirectorDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newDerictor = await this.prisma.directors.create({
      data: {
        full_name,
        ID,
        hashedPassword,
        phone_number,
        image,
      },
    });

    return newDerictor;
  }

  findAll() {
    return `This action returns all directors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} director`;
  }

  update(id: number, updateDirectorDto: UpdateDirectorDto) {
    return `This action updates a #${id} director`;
  }

  remove(id: number) {
    return `This action removes a #${id} director`;
  }
}
