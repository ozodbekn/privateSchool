import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginTeacherDto {
  @ApiProperty({ example: "654321" })
  @IsString()
  ID: string;
  @ApiProperty({ example: "123456" })
  @IsString()
  password: string;
}
