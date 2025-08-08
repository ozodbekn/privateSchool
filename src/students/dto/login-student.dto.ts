import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,   IsString } from "class-validator";

export class LoginStudentDto {
  @IsString()
  @ApiProperty({ example: "123456" })
  @IsNotEmpty()
  ID: string;
  @IsString()
  @ApiProperty({ example: "123456" })
  @IsNotEmpty()
  password: string;
}
