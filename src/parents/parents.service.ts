import { ConflictException, Injectable } from "@nestjs/common";
import { CreateParentDto } from "./dto/create-parent.dto";
import { UpdateParentDto } from "./dto/update-parent.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class ParentsService {
  constructor(private readonly prisma: PrismaService) {}
create(){
  return `df`
}
  findAll() {
    return `This action returns all parents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  update(id: number, updateParentDto: UpdateParentDto) {
    return `This action updates a #${id} parent`;
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
}
