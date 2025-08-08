import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateLessonDto {
    @ApiProperty({ example: "1", description: "Lesson start time" })
    @IsNotEmpty()   
    @IsString()
    start_time:string
    @ApiProperty({ example: "1", description: "Lesson end time" })
    @IsNotEmpty()   
    @IsString()
    end_time:string
    @ApiProperty({ example: 1, description: "Lesson day of week" })
    @IsNotEmpty()   
    @IsNumber()
    dayofweek:number
    @ApiProperty({ example: 1, description: "Lesson students id" })
    @IsNotEmpty()   
    @IsNumber()
    studentsId:number
    @ApiProperty({ example: 1, description: "Lesson rooms id" })
    @IsNotEmpty()   
    @IsNumber()
    roomsId:number
    @ApiProperty({ example: 1, description: "Lesson subject id" })
    @IsNotEmpty()   
    @IsNumber()
    subjectId:number
}

const reqBody = {
    "start_time":"10:00",
    "end_time":"12:00",
    "dayofweek":1,
    "studentsId":1,
    "roomsId":1,
    "subjectId":1
}
