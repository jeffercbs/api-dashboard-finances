import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('register')
export class CreateRegisterInput {
   @Field()
   @IsNotEmpty()
   @IsString()
   title: string;

   @Field()
   @IsString()
   @IsNotEmpty()
   description: string;

   @Field()
   @IsString()
   @IsNotEmpty()
   category: string;

   @Field()
   @IsNotEmpty()
   user_id: string;

   @Field()
   @IsString()
   type: string;

   @Field()
   amount: number;
}
