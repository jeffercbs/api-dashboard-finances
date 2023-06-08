import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
   @Field()
   ip: string;

   @Field()
   user_agent: string;

   @Field()
   user_id: number;
}

