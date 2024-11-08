import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  floor: string;

  @IsInt()
  @IsNotEmpty()
  number: number;

  @IsBoolean()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  apartment_type: string;
}