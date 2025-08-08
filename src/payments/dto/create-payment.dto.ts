import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty({example:"100000"})
    @IsString()
    @IsNotEmpty()
    amount:string
    @ApiProperty({example:"cash"})
    @IsString()
    @IsNotEmpty()
    payment_method:"cash"|"card"|"transfer"
    @ApiProperty({example:"paid"})
    @IsString()
    @IsNotEmpty()
    status:"paid"|"pending"|"failed"|"refunded"
    @ApiProperty({example:1})
    @IsNumber()
    @IsNotEmpty()
    contractId:number
}

