import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  // validating email to check if it empty or not
  @IsNotEmpty()
  username: string;

  // checking if email is empty or not
  @IsNotEmpty()
  email: string;

  // validating if the form data is a valid email
  @IsEmail()
  password: string;
}
