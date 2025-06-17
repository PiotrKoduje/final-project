import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
  Max
} from 'class-validator';
import { Type } from 'class-transformer';
import { currentYear } from 'src/utils/currentYear';

export class CreateWineDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 1000)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  country: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  color: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  style: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  grapeVariety: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  region: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  volume: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  alkohol: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1800)
  @Max(currentYear)
  vintage: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  price: number;

  photos: string;
};