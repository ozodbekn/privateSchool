import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSubjectDto {
    @ApiProperty({ example: "Math", description: "Subject name" })
    @IsNotEmpty()   
    @IsString()
    name:string
    @ApiProperty({ example: "Math", description: "Subject description" })
    @IsNotEmpty()   
    @IsString()
    description:string
    @ApiProperty({ example: 1, description: "Subject teachers id" })
    @IsNotEmpty()   
    @IsNumber()
    teachersId:number
    @ApiProperty({ example: 1, description: "Subject classes id" })
    @IsNotEmpty()   
    @IsNumber()
    classesId:number
}

const reqBody = {
    "name":"Math",
    "description":"Math description",
    "teachersId":1,
    "classesId":1
}
