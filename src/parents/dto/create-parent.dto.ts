import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateParentDto {
  @IsString()
  @ApiProperty({ example: "John Doe" })
  full_name: string;

  @IsEmail()
  @ApiProperty({ example: "parent@gmail.com" })
  email: string;

  @IsString()
  @ApiProperty({ example: "+998991234567" })
  phone_number: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: "123456" })
  password: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: "123456" })
  confirm_password: string;
}
