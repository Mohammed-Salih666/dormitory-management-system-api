import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {

  @IsInt()
  @IsNotEmpty()
  user_id: number;

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