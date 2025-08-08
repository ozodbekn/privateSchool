import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClassDto {
    @IsNumber()
    @ApiProperty({example:1})
    number: number;
    @IsString()
    @ApiProperty({example:"A"})
    letter: string;
    @IsNumber()
    @ApiProperty({example:1})
    teachersId: number;
    @IsNumber()
    @ApiProperty({example:1})
    schoolId: number;   
}
