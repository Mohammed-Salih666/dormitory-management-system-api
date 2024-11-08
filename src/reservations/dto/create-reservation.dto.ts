import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {

  @IsString()
  @IsNotEmpty()
  user_uni_id: string;

  @IsInt()
  @IsNotEmpty()
  room_id: number;

  @IsString()
  @IsNotEmpty()
  semester: string; 

  @IsString()
  @IsNotEmpty()
  year: string;

}