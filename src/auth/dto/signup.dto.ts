import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class signUpDto {
  @IsString()
  @IsNotEmpty()
  name: string; 
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @IsBoolean()
  gender: boolean; 
}