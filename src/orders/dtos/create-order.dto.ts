import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  Length,
  IsArray,
  ValidateNested,
  Min,
  IsUUID,
  IsBoolean,
  IsEmail,
  IsOptional,
  MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  items: CreateOrderItemDTO[];
}


export class CreateOrderItemDTO {
  @IsUUID()
  wineId: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  infoFromClient?: string;

  @IsBoolean()
  packAsGift: boolean;
}