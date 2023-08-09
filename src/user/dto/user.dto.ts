import { IsNumber, IsString } from "class-validator";

export class UserDto {
  @IsNumber()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;
  
}
