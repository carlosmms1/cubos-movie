import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'Name is required!' })
  @Length(1, 128)
  name: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'Password is required!' })
  password: string;
}
