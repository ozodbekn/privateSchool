import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreateDirectorDto } from "./dto/create-director.dto";
import { UpdateDirectorDto } from "./dto/update-director.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";


@Injectable()
export class DirectorsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDirectorDto: CreateDirectorDto) {
    const { full_name, ID, password, phone_number, confirm_password, image } =
      createDirectorDto;
    const exist = await this.prisma.idList.findFirst({ where: { ID } });
    if (exist) {
      throw new ConflictException("Bunday id lik foydalanuvchi bor!");
    }

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

    await this.prisma.idList.create({
      data: { ID: ID },
    });
    

    return newDerictor;
  }

  findAll() {
    const director = this.prisma.directors.findMany({select:{School:true}});
    if (!director) {
      throw new NotFoundException("Director not found");
    }
    return director;
  }

  findOne(id: number) {
    const director = this.prisma.directors.findUnique({where:{id},select:{School:true}});
    if (!director) {
      throw new NotFoundException("Director not found");
    }
    return director;
  }

  update(id: number, updateDirectorDto: UpdateDirectorDto) {
    const director = this.prisma.directors.findUnique({where:{id}});
    if (!director) {
      throw new NotFoundException("Director not found");
    }
    return this.prisma.directors.update({where:{id},data:updateDirectorDto});
  }

  async remove(id: number) {
    const director = await this.prisma.directors.findUnique({where:{id}});
    if (!director) {
      throw new NotFoundException("Director not found");
    }
    await this.prisma.idList.delete({where:{ID:director.ID}});
    return this.prisma.directors.delete({where:{id}});
  }
}
