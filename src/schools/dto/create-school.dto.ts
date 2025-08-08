import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsDate,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';



import { Type } from 'class-transformer';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Tashkent Private School', description: 'School name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Chilonzor St, Tashkent', description: 'School address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '+998901234567', description: 'Phone number' })
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'privateSchool@gmail.com', description: 'Email address' })
  @IsEmail()
  email: string;



  @ApiProperty({ example: 'Description of the school', description: 'Description of the school' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://example.com/website', description: 'Website URL' })
  @IsString()
  @IsNotEmpty()
  website: string;

}


const reqBody = {

 
    "name":"Tashkent Private School",
    "address":"123 Chilonzor St, Tashkent",
    "phone_number":"+998901234567",
    "email":"privateSchool@gmail.com",
    "description":"Description of the school",
    "website":"https://example.com/website",
}