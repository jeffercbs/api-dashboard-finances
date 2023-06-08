import { Field, InputType } from '@nestjs/graphql';
import { CreateSessionInput } from './create-session.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
   @Field()
   id: string;
}

