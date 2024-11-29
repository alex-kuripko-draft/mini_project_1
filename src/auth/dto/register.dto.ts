import {IsEmail, Length, IsNotEmpty, MinLength} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({message: 'Username is required'})
  @Length(3, 16, {message: 'Username must be between 3 and 16 characters'})
  username: string;

  @IsNotEmpty({message: 'Password is required'})
  @MinLength(8, {message: 'Password is too weak. It must be minimum 8 characters'})
  password: string;
}