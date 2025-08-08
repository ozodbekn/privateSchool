import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createContractDto: CreateContractDto) {
    const { start_date, end_date, amount, status, studentsId } = createContractDto;
    const student = await this.prisma.students.findUnique({
      where: {
        id:studentsId,
      },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    const contract = await this.prisma.contract.create({
      data: {
        start_date,
        end_date,
        amount,
        status,
        studentsId: student.id,
      },
    });
    return contract;
  }

  async findAll() {
    const contracts = await this.prisma.contract.findMany({
      include: {
        Students:true
      },
    });

    if (!contracts) {
      throw new NotFoundException('Contracts not found');
    }

    return contracts;
  }

  async findOne(id: number) {
    const contract =await this.prisma.contract.findUnique({
      where: {
        id,
      },
      include: {
        Students:true,
      },
    });
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    return contract;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return this.prisma.contract.update({
      where: {
        id,
      },
      data: {
        ...updateContractDto,
      },
    });
    
  }

  remove(id: number) {
    return this.prisma.contract.delete({
      where: {
        id,
      },
    });
  }
}
