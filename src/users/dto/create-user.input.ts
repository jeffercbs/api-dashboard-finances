import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserInput {
   @IsNotEmpty()
   name: string;

   @IsNotEmpty()
   email: string;

   @IsNotEmpty()
   @MinLength(8)
   password: string;
}
