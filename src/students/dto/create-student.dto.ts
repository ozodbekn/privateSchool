import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "123456789" })
  @IsString()
  ID: string;

  @ApiProperty({ example: "password" })
  @IsString()
  password: string;

  @ApiProperty({ example: "password" })
  @IsString()
  confirm_password: string;


  @ApiProperty({ example: "2000" })
  @IsString()
  birthyear: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  parentsId: number

  @ApiProperty({ example: 1 })
  @IsNumber()
  classesId: number
}
