import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessions')
@ObjectType()
export class Session {
   @Field()
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   @Field()
   user_id: number;

   @OneToMany(() => User, (user) => user.sessions)
   user: User;

   @Column()
   @Field()
   ip: string;

   @Column()
   @Field()
   user_agent: string;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   @Field()
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   @Field()
   end_at: Date;
}

