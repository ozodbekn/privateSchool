import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateDirectorDto {
  @IsString()
  @ApiProperty({ example: "John Doe" })
  full_name: string;
  @ApiProperty({ example: "+998991234567" })
  @IsString()
  phone_number: string;
  @ApiProperty({ example: "123456" })
  @IsString()
  ID: string;
  @ApiProperty({ example: "123456" })
  @IsString()
  password: string;
  @IsString()
  @ApiProperty({ example: "123456" })
  @IsString()
  confirm_password: string;
  @ApiProperty({ example: "https://example.com/image.jpg" })
  @IsString()
  image: string;
  @ApiProperty({ example: true })
  @IsBoolean()
  is_main: boolean;
}

const reqBody= {
  "full_name":"John Doe",
  "phone_number":"+998991234567",
  "ID":"123456",
  "password":"123456",
  "confirm_password":"123456",
  "image":"https://example.com/image.jpg",
  "is_main":true
}
