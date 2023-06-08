import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('registers')
@ObjectType()
export class Register {
   @PrimaryGeneratedColumn('uuid')
   @Field()
   id: string;

   @Column()
   @Field()
   user_id: string;

   @ManyToMany(() => User, (user) => user.registers)
   user: User;

   @Column()
   @Field()
   title: string;

   @Column()
   @Field()
   description: string;

   @Column()
   @Field()
   category: string;

   @Column()
   @Field()
   type: string;

   @Column()
   @Field()
   amount: number;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   @Field(() => Date, { defaultValue: new Date() })
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   @Field(() => Date, { defaultValue: new Date() })
   updated_at: Date;
}
