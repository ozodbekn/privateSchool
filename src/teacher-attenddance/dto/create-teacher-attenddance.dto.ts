import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum } from "class-validator";

export class CreateTeacherAttenddanceDto {
    @ApiProperty({ example: "KELGAN", description: "Teacher attenddance status" })
    @IsNotEmpty()
    status: "KELGAN" | "SABABSIZ_KELMAGAN" | "SABABLI_KELMAGAN";
    @ApiProperty({ example: 1, description: "Teacher id" })
    @IsNotEmpty()   
    teachersId: number;
}
