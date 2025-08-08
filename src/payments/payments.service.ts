import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { StudentStatus } from '@prisma/client';

  
@Injectable()
export class PaymentsService {
  constructor(private readonly prisma:PrismaService){}
 async create(createPaymentDto: CreatePaymentDto) {
    const {amount,status,contractId,payment_method} = createPaymentDto
    const contract = await
     this.prisma.contract.findUnique({
      where:{
        id:contractId,
      }

    })

    if(!contract){
      throw new NotFoundException('Contract not found')
    }

    if(!contract.studentsId){
      throw new NotFoundException('Student not found')
    }
    const student = await this.prisma.students.findUnique({
      where:{
        id: contract.studentsId
      }
    })
    if(!student){
      throw new NotFoundException('Student not found')
    }

    await this.prisma.students.update({
      where:{
        id: student.id
      },
      data:{
        status:StudentStatus.active
      }
    })
  
    const payment = await this.prisma.payment.create({
      data:{
        amount,
        status,
        payment_method,
        contractId
      }
    })


    
    return payment
  }

  findAll() {
    return this.prisma.payment.findMany(
      {
        include:{
          Contract:true
        }
      }
    )
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({
      where:{
        id
      },
      include:{
        Contract:true
      }
    })
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = this.prisma.payment.findUnique({
      where:{
        id
        }
    })
    if(!payment){
      throw new NotFoundException('Payment not found')
    }
    const updatedPayment = this.prisma.payment.update({
      where:{
        id
      },
      data:updatePaymentDto
    })
    return updatedPayment
  }

  remove(id: number) {
    const payment = this.prisma.payment.findUnique({
      where:{
        id
      }
    })
    if(!payment){
      throw new NotFoundException('Payment not found')
    }
    return this.prisma.payment.delete({
      where:{
        id
      }
    })
  }
}
