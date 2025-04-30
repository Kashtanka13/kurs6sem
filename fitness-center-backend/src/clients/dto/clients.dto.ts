import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsDateString()
  birthDate: string;

  @IsOptional()
  @IsDateString()
  membershipStartDate?: string;

  @IsOptional()
  @IsDateString()
  membershipEndDate?: string;
}

export class UpdateClientDto {
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsDateString() birthDate?: string;
  @IsOptional() @IsDateString() membershipStartDate?: string;
  @IsOptional() @IsDateString() membershipEndDate?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
