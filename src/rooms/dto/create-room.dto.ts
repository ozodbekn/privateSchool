import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";
import { IsNumber } from "class-validator";

export class CreateRoomDto {

    @ApiProperty({ example: "1", description: "Room name" })
    @IsNotEmpty()   
    @IsString()
    name:string
    @ApiProperty({ example: "1", description: "Room type" })
    @IsNotEmpty()   
    @IsString()
    type:string
    @ApiProperty({ example: 1, description: "Room capacity" })
    @IsNotEmpty()   
    @IsNumber()
    capacity:number
    @ApiProperty({ example: "image.jpg", description: "Room image" })
    @IsNotEmpty()   
    @IsString()
    image:string
    @ApiProperty({ example: 1, description: "Room floor" })
    @IsNotEmpty()   
    @IsNumber()
    floor:  number
   
}

const reqBody = {
    "name":"Room 1",
    "type":"Type 1",
    "capacity":10,
    "image":"image.jpg",
    "floor":1
}