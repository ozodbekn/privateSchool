import { AttendStatus } from "generated/prisma";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStudentAttenddanceDto {
  @ApiProperty({ example: 1, description: "Student id" })
  @IsInt()
  @IsNotEmpty()
  studentsId: number;

  @ApiProperty({ example: "ishim chiqib qoldi", description: "Reason" })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({ example: AttendStatus.KELGAN, description: "Status", enum: AttendStatus })
  @IsEnum(AttendStatus)
  @IsNotEmpty()
  status: AttendStatus;
}
