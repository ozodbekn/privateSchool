import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateHomeworkDto {
    @ApiProperty({ example: "Math", description: "homework title" })
    @IsString()
    @IsNotEmpty()
    title: string
    @ApiProperty({ example: "Math", description: "homework description" })
    @IsString()
    @IsNotEmpty()
    description: string
    @ApiProperty({ example: "Math", description: "Subject due date" })
    @IsString()
    @IsNotEmpty()
    due_date: string
    @ApiProperty({ example: "Math", description: "Subject id" })
    @IsNumber()
    @IsNotEmpty()
    subjectId: number
}
