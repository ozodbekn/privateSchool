import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAdminDto {
  @IsString()
@ApiProperty({example: "John Doe"})
  full_name: string;
@IsEmail()
@ApiProperty({example: "admin@gmail.com"})
  email: string;
@IsString()
@ApiProperty({example: "+998991234567"})
  phone_number: string;
@IsString()
@ApiProperty({example: "123456"})
  password: string;
@IsString()
@ApiProperty({example: "123456"})
  confirm_password: string;
}
