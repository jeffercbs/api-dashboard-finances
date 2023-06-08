import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Register } from 'src/registers/entities/register.entity';
import { Session } from 'src/sessions/entities/session.entity';
import {
   Column,
   Entity,
   ManyToMany,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
   @Field(() => Int)
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   @Field()
   name: string;

   @Column()
   @Field()
   email: string;

   @Column()
   @Field()
   password: string;

   @OneToMany(() => Register, (register) => register.user)
   registers: Register[];

   @ManyToMany(() => Session, (session) => session.user)
   sessions: Session[];

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   @Field()
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   @Field()
   updated_at: Date;
}
