import { MinLength } from 'class-validator';

export class LoginAuthInput {
   email: string;

   @MinLength(8)
   password: string;
}
