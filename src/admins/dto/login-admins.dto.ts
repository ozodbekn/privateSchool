import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginAdminDto {
@IsEmail()
@ApiProperty({example: "admin@gmail.com"})
  email: string;
@IsString()
@ApiProperty({example: "123456"})
  password: string;
}
