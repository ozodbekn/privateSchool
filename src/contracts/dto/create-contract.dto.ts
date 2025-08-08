import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContractDto {
    @ApiProperty({example:"2025-08-08"})
    @IsString()
    @IsNotEmpty()
    start_date: string;
    @ApiProperty({example:"2025-08-08"})
    @IsNotEmpty()
    end_date: string;
    @ApiProperty({example:"100000"})
    @IsString()
    @IsNotEmpty()
    amount: string;
    @ApiProperty({example:"active"})
    @IsString()
    @IsNotEmpty()
    status:"active"|"pending"|"cancelled"|"expired"
    @ApiProperty({example:1})
    @IsNumber()
    @IsNotEmpty()
    studentsId: number;
}


