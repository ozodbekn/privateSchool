import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDirectorDto {
  @IsString()
@ApiProperty({example: "John Doe"})
  full_name: string;
@ApiProperty({example: "+998991234567"})
  phone_number: string;
@ApiProperty({example: "123456"})
  ID: string;
@ApiProperty({example: "123456"})
  password: string;
@ApiProperty({example: "123456"})
  confirm_password: string;
@ApiProperty({example: "https://example.com/image.jpg"})
  image: string;
@ApiProperty({example: true})
  is_main: boolean;
}
