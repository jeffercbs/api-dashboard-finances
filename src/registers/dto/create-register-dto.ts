import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegisterInput {
   @IsNotEmpty()
   @IsString()
   title: string;

   @IsString()
   @IsNotEmpty()
   description: string;

   @IsString()
   @IsNotEmpty()
   category: string;

   @IsNotEmpty()
   user_id: string;

   @IsString()
   type: string;

   @IsNotEmpty()
   amount: number;

   board_id?: string;
}
