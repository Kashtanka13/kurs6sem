import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class AdminLoginDto extends LoginDto {}

export class AdminRegisterDto extends LoginDto {
  @IsString()
  @MinLength(6)
  declare password: string;
}
