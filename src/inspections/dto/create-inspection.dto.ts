import { IsDateString, IsInt, IsNotEmpty } from "class-validator";


export class CreateInspectionDto {
  @IsInt()
  @IsNotEmpty()
  reservation_id: number;

  @IsDateString()
  @IsNotEmpty()
  inspection_date: Date;
}