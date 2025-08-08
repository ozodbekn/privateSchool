import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDirectorDto {
  @ApiProperty({ example: "123456" })
  @IsString()
  ID: string;
  @ApiProperty({ example: "123456" })
  @IsString()
  password: string;
}
