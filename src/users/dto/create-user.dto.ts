import { IsBoolean, IsEmail, IsIn, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ROLES } from "src/utils/Roles.enum";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string; 
  
  @IsString()
  @IsNotEmpty()
  uni_id: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string; 

  @IsUrl()
  image: string; 

  @IsString()
  @IsIn(Object.values(ROLES))
  @IsNotEmpty()
  role: string; 

  @IsBoolean()
  has_deposit: boolean;
}