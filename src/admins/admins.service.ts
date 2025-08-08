import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}



  findAll() {
    return this.prisma.admins.findMany({});
  }

  findOne(id: number) {
    const admin = this.prisma.admins.findUnique({where:{id}});
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = this.prisma.admins.findUnique({where:{id}});
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return this.prisma.admins.update({where:{id},data:updateAdminDto});
  }

  remove(id: number) {
    const admin = this.prisma.admins.findUnique({where:{id}});
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return this.prisma.admins.delete({where:{id}}); 
  }
}
