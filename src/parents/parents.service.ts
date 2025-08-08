import { ConflictException, Injectable } from "@nestjs/common";
import { CreateParentDto } from "./dto/create-parent.dto";
import { UpdateParentDto } from "./dto/update-parent.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class ParentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.parents.findMany({});
  }

  findOne(id: number) {
    return this.prisma.parents.findUnique({where:{id}});
  }

  update(id: number, updateParentDto: UpdateParentDto) {
    return this.prisma.parents.update({where:{id},data:updateParentDto});
  }

  remove(id: number) {
    return this.prisma.parents.delete({where:{id}});
  }
}
