import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateHomeworkSumbmissionDto {
    @ApiProperty({ example: "https://example.com/file.pdf" })
    @IsString()
    file_url: string;
    @ApiProperty({ example: "Comment" })
    @IsString()
    comment?: string;
    @ApiProperty({ example: 1 })
    @IsNumber()
    studentsId: number;
    @ApiProperty({ example: 1 })
    @IsNumber()
    homeworkId: number;
}

