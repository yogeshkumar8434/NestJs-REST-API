import { IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNumber()
  id: string;

  @IsString()
  taskName: string;

  @IsString()
  description: string;
  
}
