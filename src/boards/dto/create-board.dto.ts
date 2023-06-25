import { IsNotEmpty } from 'class-validator';
import { CreateRegisterInput } from 'src/registers/dto/create-register-dto';

export class CreateBoardDto {
   @IsNotEmpty()
   title: string;

   @IsNotEmpty()
   description: string;

   @IsNotEmpty()
   user_id: string;

   registers?: CreateRegisterInput[];
}
