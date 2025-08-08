import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
  @IsString()
  @ApiProperty({example:"John Doe"})
  full_name: string;
  @IsString()
  @ApiProperty({example:"123456789"})
  ID: string;
  @IsString()
    @ApiProperty({example:"123456789"})
  phone_number: string;
  @IsString()
  @ApiProperty({example:"123456"})
  password: string;
  @IsString()
  @ApiProperty({example:"123456"})
  confirm_password: string;
  @IsString()
  @ApiProperty({example:"123456"})
  diplom: string;
}
